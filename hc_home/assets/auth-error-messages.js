document.addEventListener('DOMContentLoaded', function () {
  const errors = (document.getElementById('auth-error-strings') || {}).dataset || {};
  const codeMap = {
    E001: {
      title: errors.defaultErrorTitle || errors.defaultTitle,
      subtitle: errors.invalidData || errors.defaultSubtitle,
      btn: errors.btnDefaultError
    },
    E002: {
      title: errors.invalidEmailTitle || errors.defaultTitle,
      subtitle: errors.invalidEmail || errors.defaultSubtitle,
      btn: errors.btnRetryError
    },
    A001: {
      title: errors.defaultErrorTitle || errors.defaultTitle,
      subtitle: errors.authError || errors.defaultSubtitle,
      btn: errors.btnDefaultError
    },
    P001: {
      title: errors.defaultErrorTitle || errors.defaultTitle,
      subtitle: errors.authError || errors.defaultSubtitle,
      btn: errors.btnDefaultError
    },
    S001: {
      title: errors.defaultErrorTitle || errors.defaultTitle,
      subtitle: errors.genericError || errors.defaultSubtitle,
      btn: errors.btnDefaultError
    },
    N001: {
      title: errors.defaultTitle,
      subtitle: errors.defaultSubtitle,
      btn: errors.btnDefaultError
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
    // preserve original href from the HTML (usually help center home)
    if (!actionBtn.getAttribute('data-default-href')) {
      const rawHref = actionBtn.getAttribute('href') || '/';
      const originalHref = getSafeHref(rawHref);
      actionBtn.setAttribute('data-default-href', originalHref);
    }

    // mapped.btn contains the final label text (from dataset), so compare it
    const mappedBtnText = mapped.btn;
    const retryText = errors.btnRetryError;
    const defaultText = errors.btnDefaultError;

    // If mapped button text equals the retry label, make it a history-back action
    if (mappedBtnText && retryText && mappedBtnText === retryText) {
      actionBtn.setAttribute('href', '#');
      actionBtn.textContent = mappedBtnText;
      // remove any title attribute coming from the template
      if (actionBtn.hasAttribute && actionBtn.hasAttribute('title')) {
        actionBtn.removeAttribute('title');
      }
      actionBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (window.history && window.history.length > 1) {
          window.history.back();
        } else {
          // fallback: go to home
          window.location.href = getSafeHref(actionBtn.getAttribute('data-default-href') || '/');
        }
      });
    } else {
      // For default/back (or any other case), keep the original href from HTML
      const originalHref = getSafeHref(actionBtn.getAttribute('data-default-href') || '/');
      actionBtn.setAttribute('href', originalHref);
      // Use mapped.btn if present, otherwise fall back to available labels
      actionBtn.textContent = mappedBtnText || defaultText || 'Torna alla home';
      // Remove any previously attached click handlers by replacing the node
      const newBtn = actionBtn.cloneNode(true);
      actionBtn.parentNode.replaceChild(newBtn, actionBtn);
    }
  }
});
