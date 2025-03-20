// script to render a category icon based on category id or category url
// It append related icon to a container with category-icon-wrapper class
// pass id with data-id attribute and url with data-url attribute
document.addEventListener('DOMContentLoaded', () => {
  // Map with ID and related icons
  const iconMap = {
    32550674474641: 'fa-solid fa-credit-card', // Come pagare con pagoPA
    31957404459025: 'fa-solid fa-triangle-exclamation', // Problemi con il pagamento
    31957401197969: 'fa-solid fa-receipt' // Esito del pagamento rimborsi e ricevute
  };

  // Func to extract ID from URL
  const extractIdFromUrl = (url) => {
    const match = url.match(/\/sections\/(\d+)-/);
    return match ? match[1] : null;
  };

  // Find all icon containers
  document.querySelectorAll('.category-icon-wrapper').forEach((container) => {
    const id = container.getAttribute('data-id'); // ID
    const url = container.getAttribute('data-url'); // URL

    // Get the ID
    const resolvedId = id || extractIdFromUrl(url);

    // Append related icon
    if (resolvedId && iconMap[resolvedId]) {
      container.innerHTML = `<i class="${iconMap[resolvedId]} category-icon" aria-hidden="true"></i>`;
    }
  });
});
