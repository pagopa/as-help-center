document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with 'format-text'attribute
  const elements = document.querySelectorAll('[format-text]');

  elements.forEach((element) => {
    // Get text element
    const text = element.textContent;

    // Substitute '[newline]' with HTML new line
    const formattedText = text.replace(/\[newline\]/g, '<br>');

    // Update content
    element.innerHTML = formattedText;
  });
});
