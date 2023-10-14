const createForm = document.querySelector("#create-form");
const postTitle = document.querySelector("#title");
const postImg = document.querySelector("#img");
const selectValue = document.querySelector("select");
const massage = document.querySelector("#massage");
const token = localStorage.getItem("token");
const formError = document.querySelector("#formError");
const sinOut = document.querySelector(".sign-out");
const user = JSON.parse(localStorage.getItem("data"))


const Name = document.querySelector("#name");
const marquName = document.querySelector("#marqu-name");
const role = document.querySelector(".level")

createForm.addEventListener("submit", newPost)


fetch("http://localhost:3000/api/categories")
    .then(response => response.json())
    .then(data => {
        data.data.forEach(title => {
            const op = document.createElement("option")
            op.value = title._id;
            op.innerHTML = title.title;
            selectValue.appendChild(op)
        });
    })



async function newPost(e) {
    formError.style.display = "none";
    console.log(postTitle.value, massage.value, selectValue.value, token)
    e.preventDefault();
    try {
        const postData = {
            title: postTitle.value,
            image: postImg.value,
            description: massage.value,
            category: selectValue.value,
        };

        // Set the request headers
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        // Make the POST request to the server
        const response = await axios.post("http://localhost:3000/api/posts", postData, config);

        // if (response.status == 200) {
        //     location.replace(location.origin + "/pages/sign-in.html");
        // }
        console.log(response)

    } catch (error) {
        console.log(error);
        formError.style.display = "block"
    }
}


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