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

  const code = getQueryParam('code');
  if (!code) return;
  const mapped = codeMap[code];
  if (!mapped) return;

  const titleEl = document.getElementById('error-page-title');
  const subtitleEl = document.getElementById('error-page-subtitle');
  if (titleEl && mapped.title) titleEl.textContent = mapped.title;
  if (subtitleEl && mapped.subtitle) subtitleEl.textContent = mapped.subtitle;
});
