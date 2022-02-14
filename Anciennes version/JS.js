function chargerFichier()
{

fetch('books.json')
.then(response => { /* Une fois que le fichier est chargÃ© */
  return response.json();  /* Convertissons le en json */
})
.then(data => { /* Une fois le fichier converti */
  books(data); /* Appelons notre fonction */
  chargeBooks();
  ChargeByAuthor();
});
}
const contcards = document.querySelector('.contcards');
const books = function (data) { 
  
bookslist = new Array();
authorslist = new Array();
categorielist = new Array();


for (var x=0; x<data.length;x++){
    var book = data[x]; 
    bookslist.push(book); 
    
for (var k=0; k < book.categories.length; k++){
    var categories = book.categories[k];


    if (categorielist.indexOf(categories)==-1) {
        categorielist.push(categories);
    }
}
    for (var j=0; j < book.authors.length; j++){
            var authors = book.authors [j]; 
            if (authorslist.indexOf(authors)==-1) {
                authorslist.push(authors);
            }
}

}

authorslist.sort();
categorielist.sort();
for (var j=0; j < authorslist.length; j++){
    var option = document.createElement("option")
    option.value = j; 
    option.innerText = authorslist[j];
    document.getElementById('authors').appendChild(option); 
}
for (var j=0; j < categorielist.length; j++){
    var option = document.createElement("option")
    option.value = categorielist[j]; 
    option.innerText = categorielist[j];
    document.getElementById('categories').appendChild(option);
}

let bookscardsList = '';
      for (var l = 0; l < bookslist.length; l++) {
            let livres = bookslist[l]; 
            let imagesLivres;
            let pagesLivres;
            let descrLivres
            if (livres.thumbnailUrl == null || livres.thumbnailUrl == undefined) {
                  imagesLivres = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
            }
            else {
                  url = livres.thumbnailUrl;
            }
            if (livres.pageCount == 0) {
                  pagesLivres = "";
            }
            else {
                  pagesLivres = '<p><span class="bold">Nombre de pages : </span>' + livres.pageCount + '</p>'
            }
            if (livres.shortDescription == null || livres.shortDescription == undefined) {
                  descrLivres = "";
            }
            else {
                  descrLivres = '<p><span class="bold">Description : </span>' + livres.shortDescription + '</p>'
            }
            bookscardsList +=
                  '<div class="card-book">'
                  + '<div class="book-image"><img src="' + url + '" alt="' + livres.title + '" />'
                  + '</div>'

                  + '<div class="card-body">'

                  + '<div class="book-title"><h3>' + livres.title + '</h3>'
                  + '</div>'

                  + '<div class="book-isbn"><p><span class="bold">ISBN : </span>' + livres.isbn + '</p>'
                  + '</div>'

                  + '<div class="date-publi"><p><span class="bold">Date de publication : </span>' + new Date(livres.publishedDate) + '</p>'
                  + '</div>'

                  + '<div class="book-pages">' + pagesLivres
                  + '</div>'

                  + '<div class="book-descr">' + descrLivres
                  + '</div>'

                  // /div card-body
                  + '</div>'
                  // /div card-book
                  + '</div>';
      }
                  contcards.innerHTML = bookscardsList; 

console.log(bookslist);

console.log(categorielist);
console.log(authorslist);
}