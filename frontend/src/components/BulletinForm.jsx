/* eslint-disable react/prop-types */
import API_URL from "../utils/urls.js";
import { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const BulletinForm = ({ owner }) => {
  const [entryContent, setEntryContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };

  const handleFormSubmit = () => {
    //event.preventDefault();

    fetch(`${API_URL}/bulletin/`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: entryContent,
        postedBy: owner,
      }),
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Bulletin entry</h2>

      <textarea id="content" value={entryContent} onChange={handleNewText} />

      <button type="submit">Post!</button>
    </form>
  );
};

export default BulletinForm;
