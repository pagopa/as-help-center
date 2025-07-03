// script for adding a meta description
// it's not possible to manage open graph there because they need to be in source code before js injection

// function for creating meta tag
let setMeta = (attr, attrValue, content) => {
  let head = document.getElementsByTagName('head')[0];
  let existingMeta = document.querySelector(`meta[${attr}="${attrValue}"]`);

  if (existingMeta) {
    existingMeta.setAttribute('content', content);
  } else {
    let metaTag = document.createElement('meta');
    metaTag.setAttribute(attr, attrValue);
    metaTag.setAttribute('content', content);
    head.prepend(metaTag);
  }
};

// for the homepage
if (LotusUtils.isHomePage()) {
  const description =
    "Scopri le guide pratiche e il supporto ufficiale per usare l'app e risolvere problemi nel Centro assistenza di IO.";
  setMeta('name', 'description', description);
}
// info privacy page
else if (LotusUtils.isCustomPage('info_privacy')) {
  setMeta('name', 'robots', 'noindex, follow');
}
// TODO: hidden article page (remove)
else if (LotusUtils.isArticlePage()) {
  const artId = LotusUtils.getArticleId();
  // eslint-disable-next-line no-undef
  if (artId && HiddenArticles.getIds().includes(artId)) {
    setMeta('name', 'robots', 'noindex, follow');
  }
} else if (LotusUtils.isSectionPage()) {
  const sectionId = LotusUtils.getSectionId();
  // eslint-disable-next-line no-undef
  if (sectionId && HiddenSections.getIds().includes(sectionId)) {
    setMeta('name', 'robots', 'noindex, follow');
  }
}
