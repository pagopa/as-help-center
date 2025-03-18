document.addEventListener('DOMContentLoaded', function () {
  const locale = LotusUtils.getLocale();
  const baseUrlArticle = `/hc/${locale}/articles`;

  const contactArticleId = 33395906409745;

  // set contact link to link above each article
  let link = document.querySelector('#cr-article-subtitle a');
  if (link) {
    const articleId = document.querySelector('[data-article-id]').innerHTML.trim();
    const articleTitle = document.querySelector('[data-article-title]').innerHTML.trim();
    link.href = `${baseUrlArticle}/${contactArticleId}?prevTitle=${articleTitle}&prevId=${articleId}`;
  }

  // if we are into contact article set back link as prevoius article
  if (window.location.href.includes(`${baseUrlArticle}/${contactArticleId}`)) {
    let backLink = document.querySelector('#article-back-link');

    let params = new URLSearchParams(window.location.search);
    let prevArticleId = params.get('prevId');
    let prevArticleTitle = params.get('prevTitle');

    let backLinkLabel = document.querySelector('#article-back-link #section-title');

    if (backLink && prevArticleId && prevArticleTitle && backLinkLabel) {
      backLink.href = `${baseUrlArticle}/${prevArticleId}`;
      backLinkLabel.innerText = prevArticleTitle;
    }
  }
});
