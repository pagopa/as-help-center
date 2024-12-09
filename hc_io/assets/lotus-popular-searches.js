(function () {
  window.Theme = window.Theme || {};
  const { protocol, hostname } = window.location;

  const locale = LotusUtils.getLocale();
  const baseUrl = `${protocol}//${hostname}/hc/${locale}/search?query=`;

  function getKeywords() {
    const keywordsEl = document.querySelector('[data-popular-searches]');
    if (!keywordsEl) {
      return true;
    }
    const keywords = keywordsEl.innerText.trim();

    return keywords.split(',').map((keyword) => {
      const param = encodeURIComponent(keyword.trim());
      const link = `${baseUrl}${param}`;
      return {
        link,
        keyword
      };
    });
  }

  window.Theme.popularSearches = () => ({
    items: getKeywords()
  });
})();
