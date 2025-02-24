(function () {
  window.Theme = window.Theme || {};

  function getLinks(columnNumber) {
    const links = document.querySelector(`[data-footer-${columnNumber}-column-links]`);
    if (!links) {
      return true;
    }
    const trimLinks = links.innerText.trim();

    return trimLinks.split(';').map((link) => {
      const linkParam = link.split('|');
      const linkName = linkParam[0].trim();
      const linkURL = linkParam[1].trim();

      return {
        linkName,
        linkURL
      };
    });
  }

  window.Theme.footerFirstColumnLinks = () => ({
    items: getLinks('first')
  });

  window.Theme.footerSecondColumnLinks = () => ({
    items: getLinks('second')
  });

  window.Theme.footerThirdColumnLinks = () => ({
    items: getLinks('third')
  });
})();
