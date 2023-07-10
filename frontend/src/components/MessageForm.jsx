import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import fetchAuth from "../utils/fetch.js";

const MessageForm = () => {
  const profileId = useOutletContext();
  const [messageContent, setMessageContent] = useState("");
  const [titleContent, setTitleContent] = useState("");

  const handleNewText = (event) => {
    setMessageContent(event.target.value);
  };
  const handleNewTitle = (event) => {
    setTitleContent(event.target.value);
  };

  const handleFormSubmit = () => {
    const fetch = {
      endpoint: "messages",
      method: "POST",
      body: JSON.stringify({
        content: messageContent,
        title: titleContent,
        postedTo: profileId,
        read: false,
      }),
    };

    fetchAuth(fetch).then((res) => console.log(res));
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
