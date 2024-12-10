(function () {
  window.Theme = window.Theme || {};
  const { protocol, hostname } = window.location;

  const locale = LotusUtils.getLocale();
  const baseUrl = `${protocol}//${hostname}/hc/${locale}/sections`;

  function convertToDash(text) {
    return text.replace(/\s+/g, '-');
  }

  function getCategories() {
    const categoriesEl = document.querySelector('[data-popular-categories]');
    if (!categoriesEl) {
      return true;
    }
    const categories = categoriesEl.innerText.trim();

    return categories.split(',').map((category) => {
      const categoryParam = category.split('|');
      const categoryName = categoryParam[0].trim();
      const categoryId = categoryParam[1].trim();

      const link = `${baseUrl}/${categoryId}-${convertToDash(categoryName)}`;
      return {
        link,
        categoryName
      };
    });
  }

  window.Theme.popularCategories = () => ({
    items: getCategories()
  });
})();
