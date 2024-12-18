// eslint-disable-next-line no-unused-vars
function openIOApp() {
  // remove pointer mouse
  const openAppButton = document.getElementById('open-io-app-cta');
  openAppButton.classList.add('lt-btn-loading');

  // add spinner to the button
  const openAppSpinner = document.getElementById('open-app-spinner');
  openAppSpinner.classList.remove('lt-d-none');
  openAppSpinner.classList.add('lt-d-inline-block');
  openAppSpinner.setAttribute('aria-hidden', 'false');

  // Try open deep link
  window.location.href = 'ioit://main/profile';

  // Fallback (if user don't have the app o from web)
  setTimeout(() => {
    // restore button
    openAppButton.classList.remove('lt-btn-loading');
    openAppSpinner.classList.remove('lt-d-inline-block');
    openAppSpinner.classList.add('lt-d-none');
    openAppSpinner.setAttribute('aria-hidden', 'true');
    // go to website
    window.location.href = 'https://io.italia.it/';
  }, 1500);
}
