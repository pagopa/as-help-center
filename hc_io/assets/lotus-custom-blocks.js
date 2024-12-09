(function () {
  /**
   * Renders custom blocks
   *
   * The content for each custom block is defined in the theme settings.
   * The data for the custom blocks is prepared in the footer.hbs template.
   *
   */

  window.Theme = window.Theme || {};
  const customBlocksEls = document.querySelectorAll('[data-custom-blocks-data]');

  if (!customBlocksEls) {
    return;
  }

  const customBlocks = [...customBlocksEls].flatMap((el) => {
    const fieldElements = el.querySelectorAll('[data-field]');

    if (!fieldElements) return [];

    const fieldValues = [...fieldElements].reduce(
      (acc, fieldEl) => ({
        ...acc,
        [fieldEl.dataset.field]: fieldEl.innerText.trim()
      }),
      {}
    );
    return fieldValues;
  });

  window.Theme.customBlocks = () => ({
    customBlocks
  });
})();
