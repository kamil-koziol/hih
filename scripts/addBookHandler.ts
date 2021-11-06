$(function () {
  $.getJSON("assets/writers.json", (json) => {
    $("#author").autocomplete({
      source: json["writers"],
    });
  });
});

class Book {
  title: string;
  author: string;
  description: string;

  constructor(title: string, author: string, description: string) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  getHTMLElement(): HTMLDivElement {
    let div = document.createElement("div");
    div.classList.add("BookDetails");

    let h2 = document.createElement("h2");
    h2.classList.add("text-light");
    h2.innerHTML = this.title;

    let h3 = document.createElement("h3");
    h3.classList.add("text-light");
    h3.innerHTML = this.author;

    let p = document.createElement("p");
    p.classList.add("text-light-accent");
    p.innerHTML = this.description;

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);

    return div;
  }
}

const form = document.querySelector("form");
form.addEventListener("change", (event) => {
  let title: string = form["book-title"].value;
  let author: string = form["author"].value;
  let description: string = form["description"].value;
  let formData = {
    title,
    author,
    description,
  };

  sessionStorage.setItem("formData", JSON.stringify(formData));
});
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dest = document.querySelector(".Books");

  let title: string = form["book-title"].value;
  let author: string = form["author"].value;
  let description: string = form["description"].value;

  let book = new Book(title, author, description);
  dest.appendChild(book.getHTMLElement());

  if (localStorage) {
    let books: Book[] = JSON.parse(localStorage.getItem("books"));
    if (books) {
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      let books: Book[] = [];
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    }
  }

  if (sessionStorage) {
    sessionStorage.removeItem("formData");
  }

  form.reset();
});

// Load form data on start
if (sessionStorage) {
  let formData = JSON.parse(sessionStorage.getItem("formData"));
  if (formData) {
    form["book-title"].value = formData["title"];
    form["author"].value = formData["author"];
    form["description"].value = formData["description"];
  }
}

// Load books on start
if (localStorage) {
  let books = JSON.parse(localStorage.getItem("books"));
  if (books) {
    const dest = document.querySelector(".Books");
    for (var i = 0; i < books.length; i++) {
      let book = new Book(
        books[i].title,
        books[i].author,
        books[i].description
      );
      dest.appendChild(book.getHTMLElement());
    }
  }
}
