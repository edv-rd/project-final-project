import API_URL from "../utils/urls";
import token from "../utils/token.js";

const fetchAuth = ({ endpoint, method, body, id }) => {

  return fetch(`${API_URL}/${endpoint}/${id}`, {
    method: `${method}`,
    headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    body: body,
  })
    .then((res) =>
      res.json())
    .then((data) => {
      return data;
    });
};

export default fetchAuth;
