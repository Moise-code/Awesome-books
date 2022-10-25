let books = [];
let awesomeBooks = document.querySelector('#awesom-boks')


function display(book){
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
    books.push(book)
    removeDom(awesomeBooks)

    window.localStorage.setItem('books',JSON.stringify(books))

    console.log(books)
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

function remove(id){
    books = books.filter(book => book.id !== id);
}

document.querySelector('form').onsubmit = (e) =>{
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

