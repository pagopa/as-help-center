document.addEventListener('DOMContentLoaded', function () {
  // Select all li elements inside related article list
  const articleItems = document.querySelectorAll('.related-articles ul li');

  articleItems.forEach((item, index) => {
    // unique title ID
    const titleId = `article-title-${index}`;

    // Get original link (article title)
    const articleLink = item.querySelector('a');
    if (!articleLink) return; // Continua solo se esiste un <a>

    // Create a tag as a wrapper
    const wrapperLink = document.createElement('a');
    wrapperLink.href = articleLink.href; // Use original href for the clickable card
    wrapperLink.classList.add('lt-w-100');
    wrapperLink.setAttribute('aria-labelledby', titleId);

    // Create <article>
    const article = document.createElement('article');
    article.classList.add(
      'lt-custom-block-item__card',
      'related-articles__card',
      'lt-block',
      'lt-block--shadow',
      'lt-p-4',
      'lt-p-lg-5',
      'lt-d-flex',
      'lt-w-100',
      'lt-h-100',
      'lt-position-relative'
    );

    // Create <h3> title
    const title = document.createElement('h3');
    title.classList.add('lt-custom-block-item__title', 'lt-mb-3', 'lt-fs-5');
    title.textContent = articleLink.textContent;
    title.id = titleId;

    // Create "read article" button
    const readArticleDiv = document.createElement('div');
    readArticleDiv.classList.add('read-article');

    const readArticleSpan = document.createElement('span');
    readArticleSpan.textContent = document
      .querySelector('#read-related-article-label')
      .textContent.trim();
    readArticleDiv.appendChild(readArticleSpan);

    // Put elements together
    article.appendChild(title);
    article.appendChild(readArticleDiv);
    wrapperLink.appendChild(article);

    // Substitute original element with wrapper
    item.innerHTML = '';
    item.classList.add('lt-custom-block-item', 'lt-d-flex');
    item.appendChild(wrapperLink);
  });
});
