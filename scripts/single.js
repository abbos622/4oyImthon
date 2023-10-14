const IdUrl = new URLSearchParams(window.location.search).get("productId");
const postIMg = document.querySelector(".post__img");
const h1title = document.querySelector("#h1__title");
const matitle = document.querySelector("#ma__title");
const postHtml = document.querySelector(".post");
const message = document.querySelector(".decription");
const categoryId = document.querySelector(".category");
const menuUl = document.querySelector(".menu");
fetch(`http://localhost:3000/api/posts/${IdUrl}`)
    .then(response => response.json())
    .then(data => {
        matitle.innerHTML = data.title
        if (data.title.length < 30) {
            h1title.style.display = "block"
            matitle.style.display = "none"
            matitle.innerHTML = "";
            h1title.innerHTML = data.title;
        } else {
            matitle.style.display = "block"
            h1title.style.display = "none"
            matitle.innerHTML = data.title;
            h1title.innerHTML = "";
        }

        postIMg.src = data.image;
        message.innerHTML = data.description;
        category(data.category)
        console.log(data)

    });

function category(id) {
    fetch(`http://localhost:3000/api/categories/${id}`)
        .then(response => response.json())
        .then(data => {
            categoryId.innerHTML = data.data.title
            console.log(data)
        })
}

if (localStorage.getItem("token")) {
    menuUl.innerHTML = `
        <li class="nav__item">
            <a href="./manage-post.html">Acount</a>
        </li>
    `
} else {
    menuUl.innerHTML = `
        <li class="nav__item"><a href="./pages/sign-in.html">Sign In</a></li>
        <li class="nav__item"> <a href="./pages/sign-up.html">Sign Up</a></li>
    `
}