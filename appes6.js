class Book {
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        
        const list = document.getElementById('book-list');

        //create a tr element
        const row = document.createElement('tr');

        //Insert Cols
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href = "#" class = "delete">X</a></td>`;
        list.appendChild(row);
    }

    showAlert(message , className){
        const div = document.createElement('div');

        //add Classname
        div.className = `alert ${className}`;
    
        //add text
        div.appendChild(document.createTextNode(message));
    
        //get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        //inset alert
        container.insertBefore(div, form);
    
        //Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
          }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//local storage class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books' , JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books' , JSON.stringify(books));
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listeners for add Book
document.getElementById('book-form').addEventListener('submit',function(e){

    //get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate Book
    const book = new Book(title,author,isbn);
    

    //Instantiate UI
    const ui = new UI();

    //validate 
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please Fill in all fields', 'error');
    }else{
        //Add book to list
        ui.addBookToList(book);
        //Add to ls
        Store.addBook(book);
        //Show success
        ui.showAlert('Book Added Successfully' , 'success');
        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteBook(e.target);

    //Remove from local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show message
    ui.showAlert('Book Removed!', 'success');
  
    e.preventDefault();
  });