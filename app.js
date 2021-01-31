// Book Constructor
function Book(title , author , isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor
function UI(){}

UI.prototype.addBookToList = function(book){

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

//show Alert
UI.prototype.showAlert = function(message , className) {
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

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//clear Fields
UI.prototype.clearFields =function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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
        //Show success
        ui.showAlert('Book Added Successfully' , 'success');
        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click',function (e){

    const ui = new UI();

    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book removed' , 'success');
    e.preventDefault();
});