// script to render a category icon based on category id or category url
// It append related icon to a container with category-icon-wrapper class
// pass id with data-id attribute and url with data-url attribute
document.addEventListener('DOMContentLoaded', () => {
  // Map with ID and related icons
  const iconMap = {
    30831027751697: 'fa-solid fa-credit-card', // Pagare con IO
    30616546994321: 'fa-solid fa-wand-magic-sparkles', // Inizia
    30616637679505: 'fa-solid fa-circle-user', // Accedere a IO con SPID
    30616691908241: 'fa-solid fa-c', // Accedere a IO con CIE
    30616588447505: 'fa-solid fa-fingerprint', // Codici, impronta e volto
    30616573690257: 'fa-solid fa-address-card', // Documenti su IO
    30831012755217: 'fa-solid fa-message', // Messaggi
    30831007235089: 'fa-solid fa-mobile-screen-button', // Notifiche SEND
    30831099135633: 'fa-solid fa-triangle-exclamation', // Problemi con il pagamento
    30831144721169: 'fa-solid fa-receipt', // Gestione pagamenti e ricevute
    30831177675409: 'fa-solid fa-gear', // Impostazioni e sicurezza
    30831196048529: 'fa-solid fa-ticket', // Carta Giovani Nazionale
    36385489298577: 'fa-solid fa-gift', // Altre iniziative
    30831203351185: 'fa-solid fa-pen' // Certificati e firme
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
