$(function () {
    $.getJSON("assets/writers.json", function (json) {
        $("#author").autocomplete({
            source: json["writers"]
        });
    });
});
var Book = /** @class */ (function () {
    function Book(title, author, description) {
        this.title = title;
        this.author = author;
        this.description = description;
    }
    Book.prototype.getHTMLElement = function () {
        var div = document.createElement("div");
        div.classList.add("BookDetails");
        var h2 = document.createElement("h2");
        h2.classList.add("text-light");
        h2.innerHTML = this.title;
        var h3 = document.createElement("h3");
        h3.classList.add("text-light");
        h3.innerHTML = this.author;
        var p = document.createElement("p");
        p.classList.add("text-light-accent");
        p.innerHTML = this.description;
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(p);
        return div;
    };
    return Book;
}());
var form = document.querySelector("form");
form.addEventListener("change", function (event) {
    var title = form["book-title"].value;
    var author = form["author"].value;
    var description = form["description"].value;
    var formData = {
        title: title,
        author: author,
        description: description
    };
    sessionStorage.setItem("formData", JSON.stringify(formData));
});
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var dest = document.querySelector(".Books");
    var title = form["book-title"].value;
    var author = form["author"].value;
    var description = form["description"].value;
    var book = new Book(title, author, description);
    dest.appendChild(book.getHTMLElement());
    if (localStorage) {
        var books = JSON.parse(localStorage.getItem("books"));
        if (books) {
            books.push(book);
            localStorage.setItem("books", JSON.stringify(books));
        }
        else {
            var books_1 = [];
            books_1.push(book);
            localStorage.setItem("books", JSON.stringify(books_1));
        }
    }
    if (sessionStorage) {
        sessionStorage.removeItem("formData");
    }
    form.reset();
});
// Load form data on start
if (sessionStorage) {
    var formData = JSON.parse(sessionStorage.getItem("formData"));
    if (formData) {
        form["book-title"].value = formData["title"];
        form["author"].value = formData["author"];
        form["description"].value = formData["description"];
    }
}
// Load books on start
if (localStorage) {
    var books = JSON.parse(localStorage.getItem("books"));
    if (books) {
        var dest = document.querySelector(".Books");
        for (var i = 0; i < books.length; i++) {
            var book = new Book(books[i].title, books[i].author, books[i].description);
            dest.appendChild(book.getHTMLElement());
        }
    }
}
