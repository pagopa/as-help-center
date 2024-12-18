function generatePadding() {
  const currentElement = document.querySelector('.lt-hero-unit__faq');
  const paddingElement = document.querySelector('.lt-padding-gen');
  if (paddingElement) {
    const heightOfCurrentElement = currentElement.offsetHeight;
    const heightOfItemInCurrentElement = 80;

    if (window.innerWidth <= 992) {
      paddingElement.style.paddingTop = `${
        heightOfCurrentElement - heightOfItemInCurrentElement
      }px`;
    } else {
      paddingElement.style.paddingTop = 0;
    }
  }
}

setTimeout(generatePadding, 5000);

window.addEventListener('resize', () => {
  generatePadding();
});
