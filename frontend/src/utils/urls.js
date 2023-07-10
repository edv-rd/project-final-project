/* eslint-disable no-undef */

//
console.log(process.env.NODE_ENV)
let API_URL = "";
if (process.env.NODE_ENV !== "production") {
  API_URL = "http://localhost:3000";
} else {
  API_URL = "https://project-final-project-backend.onrender.com";
}

export default API_URL;
