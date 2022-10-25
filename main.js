let books = JSON.parse(localStorage.getItem('booksLocalStorage')) || [];
const awesomeBooks = document.querySelector('#awesome-books');
const title = localStorage.getItem('currentTitle') || null;
const author = localStorage.getItem('currentAuthor') || null;

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

/* Display an added book to the UI */
// function display(book) {
//   awesomeBooks.innerHTML += `

//     <li id="${book.id}">
//     <h2>${book.title}</h2>
//     <h3>${book.author}</h3>
//     <button class="btn">remove</button>
//     <hr>
//     </li>

//     `;
// }

function display(book) {
  awesomeBooks.innerHTML += `

    <li id="${book.id}">
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <button class="btn">remove</button>
    <hr>
    </li>

    `;
}

/*
Filter out a removed book from an array of books contianed in each list item
- add new array of books (with one less book) to the local storage
*/
function remove(id) {
  books = books.filter((book) => book.id !== id);
  localStorage.setItem('booksLocalStorage', JSON.stringify(books));
}

/*
Initialize remove button event listeners
*/
function removeDom(element) {
  element.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const parent = e.target.parentNode;
      remove(parent.id);
      parent.remove();
    });
  });
}

/*
Add a book object to the books array
- display the book on the UI
- set booksLocalStorage variable for preserving books array during reload
- clear currentTitle and currentAuthor variables so that those will
  not be showing up after a book object has already been added
- initialize event listeners for the buttons created when adding new books
*/

function add(book) {
  display(book);
  books.push(book);
  localStorage.setItem('booksLocalStorage', JSON.stringify(books));
  localStorage.setItem('currentTitle', '');
  localStorage.setItem('currentAuthor', '');
  removeDom(awesomeBooks);
}

/*
Create a Book object and add it to the array
*/
document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  const { title, author } = e.target;
  add(new Book(title.value, author.value, Date.now().toString()));
  e.target.title.value = '';
  e.target.author.value = '';
};

/*
Listen to the keyup event of the title input box and add it
to the local storage to use it when reloading
*/
document.getElementById('title').addEventListener('keyup', (e) => {
  e.preventDefault();
  localStorage.setItem('currentTitle', e.target.value);
});

/*
Listen to the keyup event of the author input box and add it
to the local storage to use it when reloading
*/
document.getElementById('author').addEventListener('keyup', (e) => {
  e.preventDefault();
  localStorage.setItem('currentAuthor', e.target.value);
});

/*
Display books, title and author variables when the window loads
*/
window.onload = function init() {
  books.forEach((book) => {
    display(book);
  });

  document.getElementById('title').value = title;
  document.getElementById('author').value = author;
  removeDom(awesomeBooks);
};
