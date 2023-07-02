import API_URL from "../utils/urls";
import token from "../utils/token.js";

const fetchAuth = ({ endpoint, method, body }) => {
  console.log(`Fetching ${method} ${body} ${API_URL}/${endpoint}`);
  return fetch(`${API_URL}/${endpoint}/`, {
    method: "POST",
    headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    body: body,
  })
    .then((res) =>
      res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export default fetchAuth;
