document.addEventListener('DOMContentLoaded', function () {
  const locale = LotusUtils.getLocale();
  const baseUrlArticle = `/hc/${locale}/articles`;

  const contactArticleId = 33395906409745;

  let link = document.querySelector('#cr-article-subtitle a');
  if (link) {
    link.href = `${baseUrlArticle}/${contactArticleId}`;
  }
});
