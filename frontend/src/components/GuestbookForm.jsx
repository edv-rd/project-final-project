import Button from "../lib/Button";
import API_URL from "../lib/urls.js";
import { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const GuestbookForm = ({ owner }) => {
  const [entryContent, setEntryContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };

  const handleFormSubmit = (event) => {
    //event.preventDefault();

    fetch(`${API_URL}/guestbook/${owner}`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: entryContent,
        postedTo: owner,
      }),
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Guestbook entry</h2>
      <textarea id="content" value={entryContent} onChange={handleNewText} />

      <button type="submit">Post!</button>
    </form>
  );
};

export default GuestbookForm;
