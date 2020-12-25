// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Store{
  static getBooks() {
    let books;
    if(localStorage.getItem('books')===null)
    {
      books = [];
    }
    else
    {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book)
  {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn)
  {
    const books = Store.getBooks();
    books.forEach(function (book,index) {
      console.log(index)
      if(book.isbn===isbn)
      {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  
  }

}
// UI class
class UI {
  static displayBook() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    let bookList = document.querySelector("#bookList");
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn-danger btn-sm delete">X</a></td>
        `;
    bookList.appendChild(row);
  }

  static DeleteBook(el) {
    let target = el.classList.contains("delete");
    if (target) {
      el.parentElement.parentElement.remove();
      
      
    }
  }

  static showAlert(alertText, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(alertText));
    let container = document.querySelector(".container");
    let form = document.getElementById("book-form");
    console.log('something')
    container.insertBefore(div,form);
    
   setTimeout(() =>document.querySelector(".alert").remove(),2000)
    
  }
}
// Event

// Sotre class
// Event Display Book
document.addEventListener("DOMContentLoaded", UI.displayBook());
// Event Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let isbn = document.getElementById("isbn").value;
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("All Field are Required",'danger');
    
  } else {
    let addBook = new Book(title, author, isbn);
    UI.addBookToList(addBook);
    Store.addBook(addBook);
    document.getElementById("book-form").reset();
  }
});
// Add Book to UI

// Event Remove Book

document.getElementById("bookList").addEventListener("click", (e) => {
  UI.DeleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
