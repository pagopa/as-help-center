(function ($, window, document) {
  const BUTTON_ELEMENT = '[data-scroll-to-top]';

  const ScrollToTop = {
    init() {
      this.cacheElements();
      this.topbarHeight = parseInt(this.$topbar.height(), 10);

      if (this.$button.length) {
        this.bindEvents();
      }
    },
    cacheElements() {
      this.$window = $(window);
      this.$topbar = $('[data-topbar]');
      this.$button = $(BUTTON_ELEMENT);
    },
    bindEvents() {
      this.$window.on('scroll', this.handleScroll.bind(this));
      $(document).on('click', BUTTON_ELEMENT, this.handleClick);
    },
    handleClick() {
      $('html, body').animate({ scrollTop: 0 }, 1000);
      return false;
    },
    handleScroll() {
      const scrolled = this.$window.scrollTop();

      if (scrolled > this.topbarHeight) {
        this.$button.addClass(LotusConfig.css.activeClass);
      } else {
        this.$button.removeClass(LotusConfig.css.activeClass);
      }
    }
  };

  $(() => {
    ScrollToTop.init();
  });
})(jQuery, window, document);

// script for smooth scroll to categories
// when back from single category
document.addEventListener('DOMContentLoaded', function () {
  const hash = window.location.hash; // Get hash from url (i.e. #my-section)

  // if hash is "#categories"
  if (hash && hash === '#categories') {
    const targetElement = document.querySelector('#sectionHeading-sections'); // Get categories section by ID
    const topOffset = 50; // set offset (for fixed header)

    if (targetElement) {
      // Force loading to beginning of the page
      window.scrollTo(0, 0);

      // Execute smooth scroll
      setTimeout(() => {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - topOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 10); // Delay to guarantee that everything is loaded
    }
  }
});
