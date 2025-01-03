/**
 * Social share popups
 * @description open new window on share link click
 */
$(() => {
  $('.share a').click(function (e) {
    e.preventDefault();
    window.open(this.href, '', 'height = 500, width = 500');
  });
});

/**
 * Share dropdown
 * @description Toggle the share dropdown in communities
 */
$(() => {
  $('.share-label').on('click', function (e) {
    e.stopPropagation();
    const isSelected = this.getAttribute('aria-selected') === 'true';
    this.setAttribute('aria-selected', !isSelected);
    $('.share-label').not(this).attr('aria-selected', 'false');
  });

  // Remove active state from social media links
  $(document).on('click', () => {
    $('.share-label').attr('aria-selected', 'false');
  });
});

/**
 * Set location search
 * @description set window.location.search on request form
 */
$(() => {
  const $requestStatus = $('#request-status-select');
  const $requestOrganization = $('#request-organization-select');
  const $quickSearch = $('#quick-search');

  function search() {
    window.location.search = $.param({
      query: $quickSearch.val(),
      status: $requestStatus.val(),
      organization_id: $requestOrganization.val()
    });
  }

  // Submit search on select change
  $requestStatus.on('change', search);
  $requestOrganization.on('change', search);

  // Submit search on input enter
  $quickSearch.on('keypress', (e) => {
    if (e.which === 13) {
      search();
    }
  });
});
