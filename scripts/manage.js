const token = localStorage.getItem("token");
const sinOut = document.querySelector(".sign-out");
const user = JSON.parse(localStorage.getItem("data"))

const Name = document.querySelector("#name");
const marquName = document.querySelector("#marqu-name");
const role = document.querySelector(".level")

const config = {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
};
fetch(`http://localhost:3000/api/posts/6528ffa6c80759e96cc1cdf2`)
    .then(response => response.json())
    .then(data => console.log(data));



sinOut.addEventListener("click", () => {
    localStorage.removeItem("token")
})


fetch(`http://localhost:3000/api/users/${localStorage.getItem("id")}`)
    .then(response => response.json())
    .then(data => {

        let UserName = data.data.firstname + " " + data.data.lastname
        if (UserName.length < 16) {
            marquName.style.display = "none"
            Name.style.display = "block"
            Name.innerHTML = UserName
        } else {
            marquName.style.display = "block"
            Name.style.display = "none"
            marquName.innerHTML = UserName

        }
        role.innerHTML = data.data.role;
    })