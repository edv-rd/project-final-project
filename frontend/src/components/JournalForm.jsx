import Button from "../lib/Button";
import API_URL from "../utils/urls.js";
import { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const JournalForm = ({ owner }) => {
  const [entryContent, setEntryContent] = useState("");
  const [titleContent, setTitleContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };
  const handleNewTitle = (event) => {
    setTitleContent(event.target.value);
  };

  const handleFormSubmit = () => {
    //event.preventDefault();

    fetch(`${API_URL}/journal/${owner}`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: entryContent,
        title: titleContent,
        postedBy: owner,
      }),
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Journal entry</h2>
      <textarea
        id="title"
        value={titleContent}
        onChange={handleNewTitle}
        placeholder="title"
      />
      <textarea id="content" value={entryContent} onChange={handleNewText} />

      <button type="submit">Post!</button>
    </form>
  );
};

export default JournalForm;
