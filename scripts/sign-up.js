const eyeBtns = document.querySelectorAll(".eye-btn")
const firstName = document.querySelector("#firstname")
const lastName = document.querySelector("#lastname")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const form = document.querySelector("#form")
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");
const btngif = document.querySelector(".disabled")
const btnDisabled = document.querySelector(".loading")

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


form.addEventListener("submit", createNewUser)

async function createNewUser(e) {
    e.preventDefault();
    btnDisabled.setAttribute("disabled", true)
    btngif.style.display = "block"
    formError.style.display = "none"
    try {
        const passwordd = password.value;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        if (!passwordRegex.test(passwordd || !emailRegex.test(email.value))) {
            passwordError.style.display = "block";
        } else {
            passwordError.style.display = "none";
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                firstname: firstName.value,
                lastname: lastName.value,
                email: email.value,
                password: password.value,
                headers: { "Content-Type": "application/json" }
            });
            if (response.status == 201) {
                setInterval(() => {
                    btnDisabled.removeAttribute("disabled");
                    btngif.style.display = "none"
                    location.replace(location.origin + "/pages/sign-in.html")
                }, 800);
            } else {
                setInterval(() => {
                    btnDisabled.removeAttribute("disabled")
                    btngif.style.display = "none"
                    formError.style.display = "block"
                }, 800)
            }
            console.log(response)
        }

    } catch (error) {
        console.log(error);
        setInterval(() => {
            btnDisabled.removeAttribute("disabled")
            btngif.style.display = "none"
            formError.style.display = "block"
        }, 800)
    }
}