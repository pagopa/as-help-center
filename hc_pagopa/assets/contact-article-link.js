document.addEventListener('DOMContentLoaded', function () {
  const locale = LotusUtils.getLocale();
  const baseUrlArticle = `/hc/${locale}/articles`;

  const contactArticleIds = [31958790454417, 31958822849169];

  // set contact link to link above each article
  let links = document.querySelectorAll('#cr-article-subtitle a');
  if (links) {
    links.forEach((link, index) => {
      const articleId = document.querySelector('[data-article-id]').innerHTML.trim();
      const articleTitle = document.querySelector('[data-article-title]').innerHTML.trim();
      link.href = `${baseUrlArticle}/${contactArticleIds[index]}?prevTitle=${articleTitle}&prevId=${articleId}`;
    });
  }

  // if we are into contact article set back link as previous article
  if (contactArticleIds.some((id) => window.location.href.includes(`${baseUrlArticle}/${id}`))) {
    let backLink = document.querySelector('#article-back-link');

    let params = new URLSearchParams(window.location.search);
    let prevArticleId = params.get('prevId');
    let prevArticleTitle = params.get('prevTitle');

    let backLinkLabel = document.querySelector('#article-back-link #section-title');

    if (backLink && prevArticleId && prevArticleTitle && backLinkLabel) {
      backLink.href = `${baseUrlArticle}/${prevArticleId}`;
      backLinkLabel.innerText = prevArticleTitle;
    }

    // hide article contacts and add a bottom space
    document.querySelector('#article-contact-box').classList.add('hidden');
    document.querySelector('#article-no-contact-box').classList.remove('hidden');
  }
});
