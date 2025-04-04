document.addEventListener('DOMContentLoaded', function () {
  const currentPathname = window.location.pathname;
  const locale = LotusUtils.getLocale();
  const baseUrlArticle = `/hc/${locale}/articles`;

  const supportArticle = 34047454046097; // contattare l'assistenza
  const paymentChannelSupportArticle = 34047636446737; // ottenere supporto per canali di pagamento abilitati
  const contactArticleIds = [supportArticle, paymentChannelSupportArticle];

  // set contact link to link above each article page
  let links = document.querySelectorAll('#cr-article-subtitle a');
  if (links) {
    links.forEach((link, index) => {
      const articleId = document.querySelector('[data-article-id]').innerHTML.trim();
      const articleTitle = document.querySelector('[data-article-title]').innerHTML.trim();
      link.href = `${baseUrlArticle}/${contactArticleIds[index]}?prevTitle=${articleTitle}&prevId=${articleId}`;
    });
  }

  // if we are into contact article set back link as previous article (if we come from an article) or as previous page (if we come from home or section page)
  if (contactArticleIds.some((id) => currentPathname.includes(`${baseUrlArticle}/${id}`))) {
    let backLink = document.querySelector('#article-back-link');

    let params = new URLSearchParams(window.location.search);
    let prevArticleId = DOMPurify.sanitize(params.get('prevId')); // if we come from an article
    let prevPageLink = DOMPurify.sanitize(params.get('prevPage')); // if we come from home or section page
    let prevPageTitle = DOMPurify.sanitize(params.get('prevTitle'));

    let backLinkLabel = document.querySelector('#article-back-link #section-title');

    // if we come from an article
    if (backLink && prevArticleId && prevPageTitle && backLinkLabel) {
      backLink.href = `${baseUrlArticle}/${prevArticleId}`;
      backLinkLabel.innerText = prevPageTitle;
    }

    const authorizedUrlsPattern = [
      /^\/hc\/.*$/, // /hc/*
      /^\/hc\/.*\/sections\/.*$/ // /hc/*/sections/*
    ];

    const isAuthorized = (url) => {
      return authorizedUrlsPattern.some((regex) => regex.test(url));
    };

    // if we come from home or section page
    if (backLink && prevPageLink && prevPageTitle && backLinkLabel) {
      if (isAuthorized(prevPageLink)) {
        backLink.href = prevPageLink;
        backLinkLabel.innerText = prevPageTitle;
      }
    }

    // hide article contacts and add a bottom space
    document.querySelector('#article-contact-box').classList.add('hidden');
    document.querySelector('#article-no-contact-box').classList.remove('hidden');
  }

  // article links contact box (home, section)
  let contactLink = document.querySelector('#support-article-link');
  let otherContactLink = document.querySelector('#payment-channel-support-article-link');
  if (contactLink && otherContactLink) {
    const prevPageTitle = currentPathname.includes('/sections') ? getSectionNameByUrl() : 'Home';
    contactLink.href = `${baseUrlArticle}/${supportArticle}?prevTitle=${prevPageTitle}&prevPage=${currentPathname}`;
    otherContactLink.href = `${baseUrlArticle}/${paymentChannelSupportArticle}?prevTitle=${prevPageTitle}&prevPage=${currentPathname}`;
  }
});

function getSectionNameByUrl() {
  const sectionEndpoint = window.location.pathname.split('/sections').filter(Boolean).pop();
  const sectionName = sectionEndpoint.split('-').slice(1).join(' ');
  return sectionName;
}
