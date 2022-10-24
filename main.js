let books = JSON.parse(localStorage.getItem('books')) || [];
let awesomeBooks = document.querySelector('#awesome-books')


function display(book) {
    awesomeBooks.innerHTML+=`

    <li id="${book.id}">
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <button class="btn">remove</button>
    <hr>
    </li>

    `
}

function add(book){
    display(book);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    removeDom(awesomeBooks);
}

function removeDom(element){

    element.querySelectorAll('.btn').forEach(btn =>{
        btn.addEventListener('click',(e) =>{
            let parent = e.target.parentNode;
            remove(parent.id)
            parent.remove();
        })
    })
}

function remove(id) {
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
}

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    const{title,author} = e.target
    add({
        id:Date.now().toString(),
        title : title.value,
        author : author.value
    })
    e.target.title.value = '';
    e.target.author.value = '';
}

window.onload = function init() {
    for(var i=0; i<books.length; i++) {
        display(books[i]);
    }
}
