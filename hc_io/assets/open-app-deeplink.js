// eslint-disable-next-line no-unused-vars
function openIOApp() {
  // Try open deep link
  window.location.href = 'ioit://main/profile';

  // Fallback (if user don't have the app o from web)
  setTimeout(() => {
    window.location.href = 'https://io.italia.it/';
  }, 1000);
}
