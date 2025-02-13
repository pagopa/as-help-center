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
  // eslint-disable-next-line no-undef
  const ogImg = ogImageUrl;

  // for the homepage
  if (LotusUtils.isHomePage()) {
    const description =
      "Scopri le guide pratiche e il supporto ufficiale per usare l'app e risolvere problemi nel Centro assistenza di IO.";
    const ogDescription = 'Supporto e guide ufficiali per usare l’app IO e risolvere problemi.';
    // description
    setMeta('name', 'description', description);
    // open graph
    setMeta('property', ogProps.type, 'website');
    setMeta('property', ogProps.title, siteTitle);
    setMeta('property', ogProps.description, ogDescription);
    setMeta('property', ogProps.url, window.location.origin);
    setMeta('property', ogProps.image, ogImg);
  }
  // section page
  else if (LotusUtils.isSectionPage()) {
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
    setMeta('property', ogProps.image, ogImg);
  }
  // articles page
  else if (LotusUtils.isArticlePage()) {
    setMeta('property', ogProps.image, ogImg);
  }
  // info privacy page
  else if (LotusUtils.isCustomPage('info_privacy')) {
    setMeta('name', 'robots', 'noindex, follow');
  }
});
