const ogProps = {
  type: 'og:type',
  title: 'og:title',
  description: 'og:description',
  url: 'og:url',
  siteName: 'og:site_name',
  image: 'og:image'
};

// script for adding a meta description
document.addEventListener('DOMContentLoaded', function () {
  // Script per aggiungere o aggiornare la meta description
  let userLocale = LotusUtils.getLocale();
  let currentPageType = window.location.pathname.slice(5 + userLocale.length);

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

  const siteTitle = document.querySelector('title').innerText;
  const ogImg = '';

  // for the homepage
  if (currentPageType === '' || currentPageType === '/' || currentPageType === 'index.html') {
    const description =
      "Scopri le guide pratiche e il supporto ufficiale per usare l'app e risolvere problemi nel Centro assistenza di IO.";
    const ogDescription = 'Supporto e guide ufficiali usare l’app IO e risolvere problemi.';
    // description
    setMeta('name', 'description', description);
    // open graph
    setMeta('property', ogProps.type, 'website');
    setMeta('property', ogProps.title, siteTitle);
    setMeta('property', ogProps.description, ogDescription);
    setMeta('property', ogProps.url, window.location.origin);
    // setMeta('property', ogProps.image, ogImg);
  }
  // section page
  else if (currentPageType.startsWith('sections/')) {
    // open graph
    const siteName = siteTitle.split(' - ')[1];
    const title = siteTitle.split(' - ')[0];
    setMeta('property', ogImg.type, 'website');
    setMeta('property', ogImg.title, title);
    setMeta('property', ogImg.siteName, siteName);
    setMeta(
      'property',
      ogImg.description,
      document.querySelector('meta[name="description"]').innerText
    );
    setMeta('property', ogProps.url, window.location.origin);
    // setMeta('property', ogProps.image, ogImg);
  }
  // info privacy page
  else if (currentPageType === 'p/info_privacy') {
    setMeta('name', 'robots', 'noindex, follow');
  }
});
