document.addEventListener('DOMContentLoaded', function () {
  const ssoLogoutReturnToAddressWrappper = document.querySelector(
    `[data-auth-sso-logout-return-to-address]`
  );
  if (!ssoLogoutReturnToAddressWrappper) {
    return;
  }
  const ssoLogoutReturnToAddress = ssoLogoutReturnToAddressWrappper.innerText.trim();

  function performLogout() {
    const origin = window.location.origin || window.location.protocol + '//' + window.location.host;
    const returnToPath = origin + '/hc/' + LotusUtils.getLocale() + ssoLogoutReturnToAddress;
    const logoutUrl = '/access/logout?return_to=' + encodeURIComponent(returnToPath);
    window.location.href = logoutUrl;
  }

  // Logout btn event listener for each logout button

  const logoutButtons = document.querySelectorAll('#btn-logout, .btn-logout');
  logoutButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      performLogout();
    });
  });

  // Logout timer logic for request detail page

  const isLogoutTimerPage = document.getElementById('logout-timer-page');
  if (isLogoutTimerPage) {
    const timeoutLogoutDurationWrapper = document.querySelector(
      `[data-auth-timeout-logout-duration]`
    );
    if (!timeoutLogoutDurationWrapper) {
      return;
    }

    const timeoutLogoutDurationS = timeoutLogoutDurationWrapper.innerText
      ? Number(timeoutLogoutDurationWrapper.innerText.trim())
      : 1; // default 1 minute
    const TIMEOUT_DURATION = timeoutLogoutDurationS * 60 * 1000;
    const WARNING_DURATION_S = 10;
    const WARNING_DURATION = WARNING_DURATION_S * 1000; // 10s before logout
    let logoutTimer;
    let warningTimer;
    let countdownInterval;

    const modal = document.getElementById('session-timeout-modal');
    const countdownElement = document.getElementById('session-countdown');

    function closeModal() {
      modal.style.display = 'none';
      clearInterval(countdownInterval);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    }

    function showWarningModal() {
      modal.style.display = 'flex';
      let secondsLeft = WARNING_DURATION_S;
      countdownElement.textContent = secondsLeft;

      countdownInterval = setInterval(function () {
        secondsLeft--;
        countdownElement.textContent = secondsLeft;
        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      // Add ESC key listener when modal opens
      document.addEventListener('keydown', handleEscapeKey);
    }

    function startLogoutTimer() {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);

      // Timer for warning modal
      warningTimer = setTimeout(showWarningModal, TIMEOUT_DURATION - WARNING_DURATION);
      // Timer for effective logout
      logoutTimer = setTimeout(performLogout, TIMEOUT_DURATION);
    }

    // Close modal btn event listener
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    startLogoutTimer();
  }
});
