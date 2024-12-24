$(document).ready(function () {
  // error page URL
  const locale = LotusUtils.getLocale();
  const errorPage = `/hc/${locale}/error_preview`;

  // paths that should redirect to error page
  const restrictedPaths = [
    '/community/',
    '/categories/',
    '/contributions/',
    '/profiles/',
    '/requests/',
    '/subscriptions/'
  ];

  // current url
  const currentPath = window.location.pathname;

  // check current path with restricted paths
  for (const path of restrictedPaths) {
    if (currentPath.includes(path)) {
      // if current path matches a restricted path, redirect to error page
      const loadingSpinner = $('#loading-spinner');
      loadingSpinner.removeClass('lt-d-none');
      window.location.href = errorPage;
      break;
    }
  }
});
