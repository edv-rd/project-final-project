import API_URL from "./urls";
import token from "./token.js";

export const readEntry = ( id ) => {
  return fetch(`${API_URL}/entry/read/${id}`, {
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

export const likeEntry = ( id ) => {
  return fetch(`${API_URL}/entry/like/${id}`, {
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

}


