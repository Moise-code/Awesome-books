// const awesomeBooks = document.querySelector('#awesome-books');
class Book {
  constructor() {
    this.awesomeBooks = document.querySelector('#awesome-books');
    this.formSelector = document.querySelector('form');
    this.titleSelector = document.getElementById('title');
    this.authorSelector = document.getElementById('author');
    this.allBtnSelector = this.awesomeBooks.querySelectorAll('.btn');

    this.books = JSON.parse(localStorage.getItem('booksLocalStorage')) || [];
    this.title = localStorage.getItem('currentTitle') || null;
    this.author = localStorage.getItem('currentAuthor') || null;
  }

  /* Display an added book to the UI */
  display() {
    this.awesomeBooks.innerHTML += `
  
      <li id="${this.id}">
      <h2>"${this.title}"  by   ${this.author}</h2>
      <button class="btn button-shadow">remove</button>
      </li>
  
      `;
  }

  /*
Filter out a removed book from an array of books contianed in each list item
- add new array of books (with one less book) to the local storage
*/
  remove(id) {
    this.books = this.books.filter((book) => book.id !== id);
    localStorage.setItem('booksLocalStorage', JSON.stringify(this.books));
    this.removeBorderFromBooks();
  }

  /*
Initialize remove button event listeners
*/
  removeDom() {
    this.allBtnSelector = this.awesomeBooks.querySelectorAll('.btn');
    this.allBtnSelector.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = e.target.parentNode;
        this.remove(parent.id);
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

  add(bookObj) {
    if (this.books.length === 0) {
      document.getElementById('no-book').style.display = 'none';
      // document.getElementById('added-book').style.textAlign = "center";
    }
    this.display();
    this.books.push(bookObj);
    localStorage.setItem('booksLocalStorage', JSON.stringify(this.books));
    localStorage.setItem('currentTitle', '');
    localStorage.setItem('currentAuthor', '');
    this.removeDom();
    this.addBorderToBooks();
  }

  /*
Create a Book object and add it to the array
*/
  formSubmitted() {
    this.formSelector.onsubmit = (e) => {
      e.preventDefault();
      const { title, author } = e.target;
      const book = new Book();
      book.title = title.value;
      book.author = author.value;
      book.id = Date.now().toString();

      const bookObj = {
        title: title.value,
        author: author.value,
        id: Date.now().toString(),
      };
      // this.add(new Book(title.value, author.value, Date.now().toString()));
      book.add(bookObj);
      e.target.title.value = '';
      e.target.author.value = '';
    };
  }

  /*
Listen to the keyup event of the title input box and add it
to the local storage to use it when reloading
*/
  addEventListenerForTitle() {
    this.titleSelector.addEventListener('keyup', (e) => {
      e.preventDefault();
      localStorage.setItem('currentTitle', e.target.value);
    });
  }

  /*
Listen to the keyup event of the author input box and add it
to the local storage to use it when reloading
*/
  addEventListenerForAuthor() {
    this.authorSelector.addEventListener('keyup', (e) => {
      e.preventDefault();
      localStorage.setItem('currentAuthor', e.target.value);
    });
  }

  populateBooksOnload() {
    this.books.forEach((book) => {
      const b = new Book();
      b.title = book.title;
      b.author = book.author;
      b.id = book.id;
      b.display();
    });

    document.getElementById('title').value = this.title;
    document.getElementById('author').value = this.author;
    this.removeDom(this.awesomeBooks);
    this.removeBorderFromBooks();
  }

  removeBorderFromBooks() {
    if (this.books.length === 0) {
      this.awesomeBooks.style.border = 'none';
      document.getElementById('no-book').style.display = 'block';
    } else {
      document.getElementById('no-book').style.display = 'none';
    }
  }

  addBorderToBooks() {
    this.awesomeBooks.style.border = '2px solid black';
  }
}

/*
Display books, title and author variables when the window loads
*/

const book = new Book();
book.formSubmitted();
book.addEventListenerForTitle();
book.addEventListenerForAuthor();
window.onload = book.populateBooksOnload();
