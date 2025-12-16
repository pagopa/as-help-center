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
    '/requests',
    '/subscriptions/'
  ];

  const currentHostname = window.location.hostname;

  // Additional restricted path if current hostname is centroassistenza.pagopa.it (home)
  if (currentHostname === 'centroassistenza.pagopa.it') {
    restrictedPaths.push('/hc/it/articles/', '/hc/it/sections/', '/hc/it/search');
  }


  const currentPath = window.location.pathname;

  const hostnamesAllowingNewRequest = ['assistenza.pagopa.gov.it', 'cac-uat2.zendesk.com'];

  // check current path with restricted paths
  for (const path of restrictedPaths) {
    // Allow /requests/new and /requests/{numeric_id} on specific hostnames
    const isRequestNewPage = currentPath.includes('/requests/new');
    const isRequestDetailPage = /\/requests\/\d+/.test(currentPath);
    if (
      (isRequestNewPage || isRequestDetailPage) &&
      hostnamesAllowingNewRequest.includes(currentHostname)
    ) {
      break;
    }
    if (currentPath.includes(path)) {
      // if current path matches a restricted path, redirect to error page
      const loadingSpinner = $('#loading-spinner');
      loadingSpinner.removeClass('lt-d-none');
      window.location.href = errorPage;
      break;
    }
  }
});
