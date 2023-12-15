function displayQuote(data) {
  fetch('https://api.quotable.io/quotes?author=bruce-lee')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      // Get a random index from 0 to data.count - 1
      const randomIndex = Math.floor(Math.random() * data.count);
      // Get the quote object at that index
      const quote = data.results[randomIndex];

      quoteEl.textContent = quote.content;
      authorEl.textContent = quote.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}

displayQuote();
