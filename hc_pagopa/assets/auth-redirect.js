// Redirect to error page if user is not logged in (for auth pages)
if (LotusUtils.isRequestPage() || LotusUtils.isRequestListPage() || LotusUtils.isNewRequestPage()) {
  if (!LotusConfig.signedIn) {
    window.location.href = LotusUtils.getErrorPageNoAuth();
  }
}

// email contact form page -> Redirect to new request page if user is already signed in
if (LotusUtils.isEmailContactFormPage()) {
  if (LotusConfig.signedIn) {
    window.location.href = LotusUtils.getNewRequestPageUrl();
  }
}
