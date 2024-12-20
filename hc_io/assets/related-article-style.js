document.addEventListener('DOMContentLoaded', function () {
  // Select all li element inside related-articles list
  const articleItems = document.querySelectorAll('.related-articles ul li');
  // Iterate each <li> element (related article card)
  articleItems.forEach((item) => {
    // Get related article title (a) and replace with a span with a defined class
    const articleTitle = item.querySelector('a');
    const span = document.createElement('span');
    span.classList.add('related-articles-title-as-text');
    span.innerHTML = articleTitle.innerHTML;
    articleTitle.parentNode.replaceChild(span, articleTitle);

    // Create "read article" button
    const readArticleDiv = document.createElement('div');
    readArticleDiv.classList.add('read-article'); // Aggiunge la classe CSS
    const readArticleLink = document.createElement('a');
    readArticleLink.href = articleTitle.href; // Prende l'href originale dell'articolo
    readArticleLink.textContent = "Leggi l'articolo"; // Testo del bottone
    readArticleLink.classList.add('read-article-link'); // Aggiunge una classe per ulteriori stili
    readArticleDiv.appendChild(readArticleLink);
    // Append "read article" button inside the card (<li> element)
    item.appendChild(readArticleDiv);
  });
});
