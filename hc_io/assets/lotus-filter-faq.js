(function () {
  const MINUTE = 60;
  const KEY = `faq_list:${LotusUtils.getLocale()}`;
  const PROPERTIES = ['id', 'title', 'html_url'];

  window.Theme = window.Theme || {};
  window.Theme.faqList = () => ({
    articles: [],
    isLoaded: false,

    limit: 5,
    init() {
      if (LotusUtils.getWithExpiry(KEY)) {
        this.articles = LotusUtils.getWithExpiry(KEY);
        this.isLoaded = true;
      } else {
        this.fetchFAQ();
      }
    },
    async fetchFAQ() {
      const url = `/api/v2/help_center/${LotusUtils.getLocale()}/articles.json?label_names=faq`;
      const response = await fetch(url);

      if (!response.ok) throw new Error('HTTP error');

      const responseJSON = await response.json();

      if (responseJSON.articles.length) this.isLoaded = true;
      const articles = responseJSON.articles.slice(0, this.limit).map((article) => ({
        ...LotusUtils.pick(article, PROPERTIES),
        description: LotusUtils.truncate(article.body, 40)
      }));
      this.articles = articles;
      LotusUtils.setWithExpiry(KEY, articles, MINUTE);
    }
  });
})();
