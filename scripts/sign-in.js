const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const eyeBtns = document.querySelectorAll(".eye-btn");
const formError = document.getElementById("formError");
const btnDisabled = document.querySelector(".loading");
const btnGif = document.querySelector(".disabled");

eyeBtns.forEach(eyeBtn => {
    eyeBtn.addEventListener("click", (e) => {
        if (e.target.closest(".eye-btn").previousElementSibling.type == "password") {
            e.target.closest(".eye-btn").previousElementSibling.type = "text";
            e.target.closest(".eye-btn").firstElementChild.className = "fa-solid fa-eye-slash"
        } else {
            e.target.closest(".eye-btn").previousElementSibling.type = "password"
            e.target.closest(".eye-btn").firstElementChild.className = "fa-solid fa-eye"
        }
    })
})


form.addEventListener("submit", login);

// 

async function login(e) {
    e.preventDefault();
    btnDisabled.setAttribute("disabled", true)
    btnGif.style.display = "block"
    try {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
            email: email.value,
            password: password.value,
            headers: { "Content-Type": "application/json" }
        });
        if (response.status == 200) {
            location.replace(location.origin + "/index.html");
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("id", response.data.data._id)
            localStorage.setItem("data", JSON.stringify(response.data.data))
        }
        console.log(response.data)

    } catch (error) {
        console.log(error);
        setInterval(() => {
            btnDisabled.removeAttribute("disabled")
            formError.style.display = "block"
            btnGif.style.display = "none"
        }, 2000)
    }
}