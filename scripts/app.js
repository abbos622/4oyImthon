const swiperWrapper = document.querySelector(".swiper-wrapper")
const menuUl = document.querySelector(".menu")
async function createNewUser() {
    try {
        const response = await axios.get("http://localhost:3000/api/posts");
        const data = response.data.data;
        renderProject(data)
    } catch (error) {
        console.error(error);
    }
}

createNewUser();


function renderProject(data) {
    const fragme = document.createDocumentFragment();
    data.forEach(item => {
        const divEl = document.createElement("div");
        const d = document.createElement("div");
        d.className = "about-me"
        divEl.className = 'swiper-slide';
        divEl.innerHTML = `    
        <a class="aa" href="./pages/single.html?productId=${item._id}">
        <img width="266"  src="${item.image}" alt="img" class="card-img">
                <h2 class="card-name">${item.title ? (item.title.length > 25 ? item.title.slice(0, 21) + "..." : item.title) : ""}</h2>
                <p class="card-massage">${item.description? (item.description.length > 25 ? item.description.slice(0, 80) + "..." : item.description) : ""}</p>
            </a>
        `
        const abbos = divEl.firstElementChild


        fetch(`http://localhost:3000/api/users/${item.author}`)
            .then(response => response.json())
            .then(data => {
                console.log(abbos)
                d.innerHTML = `
                                  <img width="35" src="./images/img.svg" alt="">
                                    <div class="card__auther">
                                        <h3 style="display: none; id="name" class="name"></h3>
                                        <marquee id="marquee" class="name" style="display: block;">${data.data.firstname+" " + data.data.lastname}</marquee>
                                        <p class="role">${data.data.role}</p>
                                    </div>
                `
                abbos.appendChild(d);

            })
        fragme.appendChild(divEl)


    });
    swiperWrapper.appendChild(fragme)
}

swiperWrapper.addEventListener("click", (e) => {
    if (e.target.closest(".-slide")) {
        e.target.closest(".swiper-slide")
    }
})

if (localStorage.getItem("token")) {
    menuUl.innerHTML = `
    <li class="nav__item">
        <a href="./pages/manage-post.html">Acount</a>
    </li>
`
} else {
    menuUl.innerHTML = `
        <li class="nav__item"><a href="./pages/sign-in.html">Sign In</a></li>
        <li class="nav__item"> <a href="./pages/sign-up.html">Sign Up</a></li>
    `
}