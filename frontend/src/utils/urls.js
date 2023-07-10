/* eslint-disable no-undef */

//
let API_URL = "";
if (process.env.NODE_ENV !== "production") {
  API_URL = "http://localhost:8080";
} else {
  API_URL = "https://project-final-project-backend.onrender.com";
}

export default API_URL;
