import { useParams } from "react-router-dom";
import API_URL from "../utils/urls.js";
import { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const MessageForm = () => {
  const { profileId } = useParams();
  const [messageContent, setMessageContent] = useState("");
  const [titleContent, setTitleContent] = useState("");

  const handleNewText = (event) => {
    setMessageContent(event.target.value);
  };
  const handleNewTitle = (event) => {
    setTitleContent(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/message`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: messageContent,
        title: titleContent,
        postedTo: profileId,
      }),
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Send message</h2>
      <textarea
        id="title"
        value={titleContent}
        onChange={handleNewTitle}
        placeholder="title"
      />
      <textarea id="content" value={messageContent} onChange={handleNewText} />

      <button type="submit">Post!</button>
    </form>
  );
};

export default MessageForm;
