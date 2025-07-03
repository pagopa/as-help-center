// TODO: hidden article (remove)
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef
  const hiddenTitles = HiddenArticles.getTitles();

  // Remove hidden articles from search suggestions
  function removeArticlesFromSuggestions() {
    [...document.querySelectorAll('zd-autocomplete-multibrand')].forEach((el) => {
      if (hiddenTitles.some((t) => el.textContent.includes(t))) {
        el.remove();
      }
    });

    // If there is no article anymore (suggestions), should remove also suggestion header
    const hasResults = document.querySelector('zd-autocomplete-multibrand');
    const header = document.querySelector('zd-autocomplete-header');
    if (!hasResults && header) header.remove();
  }

  // MutationObserver -> clean every time arrives new suggestions
  const observer = new MutationObserver(removeArticlesFromSuggestions);

  // Activate only one time at first typing
  const searchInput = document.querySelector('#query');

  if (searchInput) {
    let observing = false;

    searchInput.addEventListener('input', () => {
      removeArticlesFromSuggestions(); // Clean now

      if (!observing) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        observing = true;
      }
    });
  }
});
