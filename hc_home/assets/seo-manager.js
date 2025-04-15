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
    "Visita i centri assistenza ufficiali se hai bisogno di aiuto per l'app IO, pagamenti pagoPA o SEND - Servizio Notifiche Digitali.";
  setMeta('name', 'description', description);
}
// info privacy page
else if (LotusUtils.isCustomPage('info_privacy')) {
  setMeta('name', 'robots', 'noindex, follow');
}
