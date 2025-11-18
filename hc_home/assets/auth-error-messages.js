document.addEventListener('DOMContentLoaded', function () {
  const errors = (document.getElementById('auth-error-strings') || {}).dataset || {};
  const codeMap = {
    E001: {
      title: errors.authTitle || errors.defaultTitle,
      subtitle: errors.invalidData || errors.defaultSubtitle
    },
    E002: {
      title: errors.authTitle || errors.defaultTitle,
      subtitle: errors.invalidEmail || errors.defaultSubtitle
    },
    A001: {
      title: errors.authTitle || errors.defaultTitle,
      subtitle: errors.authError || errors.defaultSubtitle
    },
    P001: {
      title: errors.authTitle || errors.defaultTitle,
      subtitle: errors.authError || errors.defaultSubtitle
    },
    S001: {
      title: errors.authTitle || errors.defaultTitle,
      subtitle: errors.authError || errors.defaultSubtitle
    },
    N001: {
      title: errors.defaultTitle,
      subtitle: errors.defaultSubtitle
    }
  };

  function getQueryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch {
      return null;
    }
  }

  // Returns a safe URL for redirects.
  function getSafeHref(href) {
    if (typeof href !== 'string') return '/';
    try {
      // Only allow same-origin URLs or root-relative paths
      var url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return '/';
      // If the href starts with 'javascript:', block it
      if (/^javascript:/i.test(href.trim())) return '/';
      // For relative URLs, require starting with '/'
      if (!url.pathname.startsWith('/')) return '/';
      // Only allow URLs that do not contain any HTML meta-characters
      if (/[<>"'`]/.test(url.pathname + url.search + url.hash)) return '/';
      return url.pathname + url.search + url.hash;
    } catch {
      return '/';
    }
  }

  const code = getQueryParam('code');
  if (!code) return;
  const mapped = codeMap[code];
  if (!mapped) return;

  const titleEl = document.getElementById('error-page-title');
  const subtitleEl = document.getElementById('error-page-subtitle');
  if (titleEl && mapped.title) titleEl.textContent = mapped.title;
  if (subtitleEl && mapped.subtitle) subtitleEl.textContent = mapped.subtitle;

  // if we matched an auth error, change action button to go back in history
  const actionBtn = document.querySelector('.error-action-btn');
  if (actionBtn && mapped.title && mapped.subtitle) {
    // preserve original href for fallback
    if (!actionBtn.getAttribute('data-default-href')) {
      const originalHref = actionBtn.getAttribute('href') || '/';
      actionBtn.setAttribute('data-default-href', originalHref);
    }

    actionBtn.setAttribute('href', '#');
    const backLabel = errors.btnBackError || 'Indietro';
    actionBtn.textContent = backLabel;
    actionBtn.textContent = backLabel;

    actionBtn.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (window.history && window.history.length > 1) {
        window.history.back();
      } else {
        // fallback: go to home
        window.location.href = getSafeHref(actionBtn.getAttribute('data-default-href') || '/');
      }
    });
  }
});
