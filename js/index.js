let clickedBook;
const likers = document.createElement('p');

const clickBook = (e) => {
  if(e.target.textContent === 'Like Book') {
    e.target.textContent = 'Unlike';
    const usersObject = [...clickedBook.users, {"username": "Pete"}]
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({"users": usersObject}),
    }
    fetch(`http://localhost:3000/books/${clickedBook.id}`, config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => alert(err.message));

    const users = usersObject;
    likers.textContent = 'Liked by: |';
    for(const user in users) {
      likers.textContent += ` ${users[user].username} |`;
    }
  } else {
    e.target.textContent = 'Like Book';
    const usersObject = [...clickedBook.users, {"username": "Pete"}].filter((x) => {
      return x.username !== "Pete";
    });
    const config = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
      body: JSON.stringify({"users": usersObject}),
    }
    fetch(`http://localhost:3000/books/${clickedBook.id}`, config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => alert(err.message));  

    const users = usersObject;
    likers.textContent = 'Liked by: |';
      for(const user in users) {
        likers.textContent += ` ${users[user].username} |`;
      }
  }
}

const displayDetails = (book) => {
  clickedBook = book;
  const panel = document.querySelector('div#show-panel');
  panel.textContent = '';
  const box = document.createElement('div');
 
  const img = document.createElement('img');
  img.src = book.img_url;
  
  const description = document.createElement('p');
  description.textContent = book.description;
  
  const users = book.users;
  likers.textContent = 'Liked by: |';
  for(const user in users) {
    likers.textContent += ` ${users[user].username} |`;
  }

  const likeBtn = document.createElement('button');
  likeBtn.textContent = 'Like Book';
  likeBtn.addEventListener('click', clickBook);

  box.append(img, description, likeBtn, likers);
  panel.append(box);
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
