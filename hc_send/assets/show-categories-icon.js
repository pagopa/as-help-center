// script to render a category icon based on category id or category url
// It append related icon to a container with category-icon-wrapper class
// pass id with data-id attribute and url with data-url attribute
document.addEventListener('DOMContentLoaded', () => {
  // Map with ID and related icons
  const iconMap = {
    32378054945297: 'fa-solid fa-sliders', // Configurazione e utilizzo
    32378036091025: 'fa-solid fa-bell', // Notifiche SEND
    32378012561937: 'fa-solid fa-credit-card', // Modalità di pagamento e ricevute
    32378029410449: 'fa-solid fa-handshake-simple', // Deleghe
    33395901813009: 'fa-solid fa-address-card' // Contatti
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
