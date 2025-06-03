document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with 'format-text'attribute
  const elements = document.querySelectorAll('[format-text]');

  elements.forEach((element) => {
    // Get text element
    const text = element.textContent;

    // sanitize and update content
    const sanitizedContent = DOMPurify.sanitize(text);

    // Update content
    element.innerHTML = sanitizedContent;

    const parentObj = element.parentElement;
    if (parentObj.classList.contains('callout-lazy')) {
      // parent obj = callout obj
      parentObj.classList.add('ready');
    }
  });
});
