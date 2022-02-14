var booksList = new Array()
var authorsList = new Array();
var categoriesList = new Array();

var categoryBookList = new Array();

const bookList = document.querySelector('.booksList');

/*On cree une fonction pour l'évenemet onload*/
function jsonOnLoad() {

  /* Allons chercher un fichier JSON */
  fetch("books.JSON")
    .then(response => { /* Une fois que le fichier est chargé */
      return response.json();  /* Convertissons le en json */
    })
    .then(data => { /* Une fois le fichier converti */
      createList(data); /* Appelons notre fonction */
    });
}
var createList = function (data) {



  for (var x = 0; x < data.length; x++) {

    var book = data[x];
    booksList.push(book);

    for (var y = 0; y < book.authors.length; y++) {
      let author = book.authors[y];

      if (authorsList.indexOf(author) == -1) {
        authorsList.push(author);
      }
    }

    for (var y = 0; y < book.categories.length; y++) {
      let category = book.categories[y];

      if (categoriesList.indexOf(category) == -1) {
        categoriesList.push(category);
      }
    }
  }
  booksList.sort();
  authorsList.sort();
  categoriesList.sort();

  for (var x = 0; x < authorsList.length; x++) {
    var option = document.createElement("option");
    option.value = authorsList[x];
    option.innerText = authorsList[x];
    document.getElementById("listAuthors").appendChild(option);
  }
  for (var x = 0; x < categoriesList.length; x++) {
    var option = document.createElement("option");
    option.value = categoriesList[x];
    option.innerText = categoriesList[x];
    document.getElementById("listCategories").appendChild(option);
  }



  // console.log(authorsList);
  // console.log(categoriesList);
  // console.log(booksList);

  showBooks(booksList); /* Appelons notre fonction */


}
// function checkResource (url, index) {
//   var req = new XMLHttpRequest();
//   req.open('HEAD', url, true);
//   req.send();
//   if (req.status === 404) {
//     return index;
//   }
//   if (req.status === 403) {
//     return index;
//   }
// };


var showBooks = function (List) {
  document.getElementById("booksList").innerHTML = ""
  for (var y = 0; y < List.length; y++) {
    var bookListe = document.createElement("div");
    bookListe.setAttribute("class","card");
    if ((List[y].thumbnailUrl==undefined) || (List[y].thumbnailUrl == null)) {
      List[y].thumbnailUrl="https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
    }
    bookListe.innerHTML = '<img src="'+ List[y].thumbnailUrl +'"/>'+'<h1 class="booktitle">'+ List[y].title +'</h1>'+'<h2 class="category">'+ List[y].categories+'</h2> ';
    document.getElementById("booksList").appendChild(bookListe);
  }
}

var ChargeByAuthor = function () {
  var e = document.getElementById("listAuthors");
  var strAuthors = e.options[e.selectedIndex].text;
  var authorsBookList = new Array();
if (strAuthors == "") {
  showBooks(booksList);
}else{

  for (var x = 0; x < booksList.length; x++) {
    let bookByAuthor = booksList[x];
    for (var y = 0; y < bookByAuthor.authors.length; y++) {
      let author = bookByAuthor.authors[y];
      if (author == strAuthors) {
        authorsBookList.push(bookByAuthor);
      }
    }
  }

  authorsBookList.sort();
  showBooks(authorsBookList);
}
}

var ChargeByCategory = function () {
  var e = document.getElementById("listCategories");
  var strCategory = e.options[e.selectedIndex].text;
  var categoryBookList = new Array();
  if (strCategory == "") {
    showBooks(booksList);
  }else{

  for (var x = 0; x < booksList.length; x++) {
    let bookByCategory = booksList[x];
    for (var y = 0; y < bookByCategory.categories.length; y++) {
      let category = bookByCategory.categories[y];
      if (category == strCategory) {
        categoryBookList.push(bookByCategory);
      }
    }
  }
  categoryBookList.sort();
  showBooks(categoryBookList);
}

}
