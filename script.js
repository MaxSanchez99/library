const openButton = document.getElementById("modal-btn");
const closeButton = document.getElementById("close");
const form = document.getElementById('modal-form');
const modal = document.getElementById('modal');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

openButton.addEventListener('click', () => {
    modal.showModal();
});

closeButton.addEventListener('click', () => {
    modal.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value)
    modal.close();
    displayBooks();
})


const myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor...
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
    let readYet = "";
    if (read) {
        readYet = "have read"
    }
    else {
        readYet = "not read yet";
    }
    return `${this.title} by ${this.author}, ${pages} pages, ${readYet}`
}

Book.prototype.changeReadStatus = function () {
    if (this.read === false) {
        this.read = true;
    }
    else {
        this.read = false;
    }
    displayBooks();
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    let haveRead = false;
    if (read === 'yes') {
        haveRead = true;
    }
    let book = new Book(title, author, pages, haveRead)
    myLibrary.push(book);
}

function displayBooks() {
    let container = document.getElementById('container')
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let book of myLibrary) {

        let bookDiv = document.createElement('div');
        bookDiv.classList.add('card')
        bookDiv.dataset.id = book.id;

        let title = document.createElement('div');
        title.textContent = `Title: ${book.title}`;
        bookDiv.appendChild(title);

        let author = document.createElement('div');
        author.textContent = `Author: ${book.author} `;
        bookDiv.appendChild(author);

        let pages = document.createElement('div');
        pages.textContent = `Pages: ${book.pages} `;
        bookDiv.appendChild(pages);

        let read = document.createElement('div');
        if (book.read === true) {
            read.textContent = `Read: Yes`;
        }
        else {
            read.textContent = `Read: No`;
        }
        bookDiv.appendChild(read);

        let removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        bookDiv.appendChild(removeBtn);

        let toggleRead = document.createElement('button');
        toggleRead.innerText = 'Read Toggle'
        bookDiv.appendChild(toggleRead)

        removeBtn.addEventListener('click', (e) => {
            const bookDiv = e.target.parentElement;
            const bookId = bookDiv.dataset.id;
            const i = myLibrary.findIndex(book => book.id === bookId)
            myLibrary.splice(i, 1);
            displayBooks();
        })

        toggleRead.addEventListener('click', (e) => {
            const bookDiv = e.target.parentElement;
            const bookId = bookDiv.dataset.id;
            const i = myLibrary.findIndex(book => book.id === bookId);
            myLibrary[i].changeReadStatus();
        })



        container.appendChild(bookDiv);
    }
}
