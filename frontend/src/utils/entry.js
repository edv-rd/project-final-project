import API_URL from "./urls";
import token from "./token.js";

const readEntry = ( id ) => {
  return fetch(`${API_URL}/read/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export default readEntry;
