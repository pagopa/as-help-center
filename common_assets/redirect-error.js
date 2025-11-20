$(document).ready(function () {
  // error page URL
  const locale = LotusUtils.getLocale();
  const errorPage = `/hc/${locale}/error`;

  // paths that should redirect to error page
  const restrictedPaths = [
    '/community/',
    '/categories/',
    '/contributions/',
    '/profiles/',
    '/requests/',
    '/subscriptions/'
  ];

  // Check if the hostname is centroassistenza.pagopa.it (home)
  const currentHostname = window.location.hostname;

  if (currentHostname === 'centroassistenza.pagopa.it') {
    // add more path
    restrictedPaths.push('/hc/it/articles/', '/hc/it/sections/', '/hc/it/search');
  }

  // current url
  const currentPath = window.location.pathname;

  const hostnamesAllowingNewRequest = ['assistenza.pagopa.gov.it'];

  // check current path with restricted paths
  for (const path of restrictedPaths) {
    console.log(currentPath, path);
    if (
      currentPath.includes('/requests/new') &&
      hostnamesAllowingNewRequest.includes(currentHostname)
    )
      break;
    if (currentPath.includes(path)) {
      // if current path matches a restricted path, redirect to error page
      const loadingSpinner = $('#loading-spinner');
      loadingSpinner.removeClass('lt-d-none');
      window.location.href = errorPage;
      break;
    }
  }
});
