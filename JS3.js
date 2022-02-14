//const loading = document.querySelector(".loading");

//Création de la variable contenant le lieu ou seront afficher les options selectionnées
const Choice = document.querySelector('.Choice');

//Création des variables pour les scripts.
var selection;

var BooksList = new Array();
var AuthorsList = new Array();
var CategoryList = new Array();

function selectedAuthor() {
    //  loading.classList.add('loading_animated');

    fetch('books.json')
        .then(response => { /* Une fois que le fichier est chargé */
            return response.json();  /* Convertissons le en json */
        })
        .then(data => { /* Une fois le fichier converti */
            GetBooks(data); /* Appelons notre fonction */
        });
}
const contcards = document.querySelector('.contcards');

function GetBooks(data) {

    for (var x = 0; x < data.length; x++) {
        var book = data[x];
        BooksList.push(book);

        for (var y = 0; y < book.authors.length; y++) {
            var author = book.authors[y];
            //vérification si l'auteur est déjà présent dans la liste des authors 
            if (AuthorsList.indexOf(author) == -1) {
                AuthorsList.push(author);
            }
        }

        for (var z = 0; z < book.categories.length; z++) {
            var categories = book.categories[z];
            if (CategoryList.indexOf(categories) == -1) {
                CategoryList.push(categories);
            }
        }
    }

    AuthorsList.sort(); // tri par ordre alphabétique
    for (var x = 0; x < AuthorsList.length; x++) {
        // création d'option 
        var option = document.createElement("option");
        option.value = x;
        option.innerText = AuthorsList[x];
        // affectation de l'option à la liste
        document.getElementById("Author").appendChild(option);
    }

    CategoryList.sort();
    for (var y = 0; y < CategoryList.length; y++) {
        var option = document.createElement("option");
        option.value = y; // clef "value"
        option.innerText = CategoryList[y]; // contenu
        document.getElementById("Category").appendChild(option)
    }

    BooksList.sort();
    BooksCharge(BooksList);
    //showBooks(booksList); /* Appelons notre fonction */
}

function BooksCharge(Charge) {
    let bookscardsList = '';
    for (var l = 0; l < Charge.length; l++) {
        let book = Charge[l];
        let imagesLivres;
        let pagesLivres;
        let descrLivres
        if ((book.thumbnailUrl == null) || (book.thumbnailUrl == undefined)) {
            imagesLivres = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
        }
        else {
            url = book.thumbnailUrl;
        }
        if (book.pageCount == 0) {
            pagesLivres = "";
        }
        else {
            pagesLivres = '<p><span class="bold">Nombre de pages : </span>' + book.pageCount + '</p>'
        }
        if (book.shortDescription == null || book.shortDescription == undefined) {
            descrLivres = "";
        }
        else {
            descrLivres = '<p><span class="bold">Description : </span>' + book.shortDescription + '</p>'
        }
        bookscardsList +=
            '<div class="card-book">'
            + '<div class="book-image"><img src="' + url + '" alt="' + book.title + '" />' + '</div>'
            + '<div class="card-body">'
            + '<div class="book-title"><h6><b>' + book.title + '</b></h6>' + '</div>'
            + '<div class="book-isbn"><p><span class="bold">ISBN : </span>' + book.isbn + '</p>' + '</div>'
            + '<div class="date-publi"><p><span class="bold">Date de publication : </span>' + new Date(book.publishedDate) + '</p>' + '</div>'
            + '<div class="book-pages">' + pagesLivres + '</div>'
            + '<div class="book-descr">' + descrLivres + '</div>'
            // /div card-body
            + '</div>'
            // /div card-book
            + '</div>';
    }
    contcards.innerHTML = bookscardsList;
}

var ChargeByAuthor = function () {
    var e = document.getElementById("Author");
    var strAuthors = e.options[e.selectedIndex].text;
    var authorsBookList = new Array();
    if (strAuthors == "") {
        BooksCharge(BooksList);
    } else {

        for (var x = 0; x < BooksList.length; x++) {
            let bookByAuthor = BooksList[x];
            for (var y = 0; y < bookByAuthor.authors.length; y++) {
                let author = bookByAuthor.authors[y];
                if (author == strAuthors) {
                    authorsBookList.push(bookByAuthor);
                }
            }
        }

        authorsBookList.sort();
        BooksCharge(authorsBookList);
    }
}

var ChargeByCategory = function () {
    var e = document.getElementById('Category');
    var strCategory = e.options[e.selectedIndex].text;
    console.log(strCategory);
    var bookSelected = new Array();
    if (strCategory == "") {
        BooksCharge(BooksList);
    } else {
        for (var i = 0; i < BooksList.length; i++) {
            let books = BooksList[i];
            for (j = 0; j < books.categories.length; j++) {
                let varie = books.categories[j];
                if (varie == strCategory) {
                    bookSelected.push(books);
                }
            }
        }
        bookSelected.sort();
        BooksCharge(bookSelected);
    }
}
