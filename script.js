let books = JSON.parse(localStorage.getItem("books")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function save(){
localStorage.setItem("books", JSON.stringify(books));
localStorage.setItem("history", JSON.stringify(history));
}

function addBook(){
let title = document.getElementById("title").value;
let category = document.getElementById("category").value;

if(title === "" || category === "") return;

books.push({title, category, borrowed:false});
updateCategories();
save();
displayBooks();
}

function updateCategories(){
let filter = document.getElementById("filter");
let categories = [...new Set(books.map(b => b.category))];

filter.innerHTML = '<option value="all">All Categories</option>';

categories.forEach(cat => {
filter.innerHTML += `<option value="${cat}">${cat}</option>`;
});
}

function displayBooks(){
let list = document.getElementById("bookList");
let search = document.getElementById("search").value.toLowerCase();
let filter = document.getElementById("filter").value;

list.innerHTML = "";

books
.filter(b => b.title.toLowerCase().includes(search))
.filter(b => filter === "all" || b.category === filter)
.forEach((b, i) => {

list.innerHTML += `
<div class="book">
${b.title} (${b.category})
<button onclick="borrowBook(${i})">
${b.borrowed ? "Return" : "Borrow"}
</button>
</div>
`;
});

displayHistory();
}

function borrowBook(i){
books[i].borrowed = !books[i].borrowed;

history.push({
title: books[i].title,
date: new Date().toLocaleString()
});

save();
displayBooks();
}

function displayHistory(){
let h = document.getElementById("history");
h.innerHTML = "";

history.slice(-5).reverse().forEach(item => {
h.innerHTML += `<div>${item.title} - ${item.date}</div>`;
});
}

updateCategories();
displayBooks();
