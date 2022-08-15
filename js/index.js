const displayDetails = (book) => {
  const panel = document.querySelector('div#show-panel');
  const box = document.createElement('div');
  const img = document.createElement('img');
  img.src = book.img_url;
  const description = document.createElement('p');
  description.textContent = book.description;
  const likers = document.createElement('p');
  likers.textContent = book.likers;
  box.append(img, description, likers);
  panel.append(box);
  console.log(book);
}

const displayTitles = (data) => {
  const list = document.querySelector('ul#list');
  for(const obj in data) {
    const book = data[obj];
    const title = document.createElement('li');
    title.textContent = book.title;
    list.append(title);
    title.addEventListener('click', () => displayDetails(book));
  }
}

const getTitles = (e) => {
  return fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(data => displayTitles(data));
}

document.addEventListener("DOMContentLoaded", getTitles);

// When a user clicks the title of a book, display the book's thumbnail, 
// description, and a list of users who have liked the book. This information 
// should be displayed in the div#show-panel element.
