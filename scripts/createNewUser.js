const axios = require('axios');


async function createNewUser() {
    try {
        const response = await axios.get("http://localhost:3000/api/posts");
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
createNewUser();