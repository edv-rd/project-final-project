import { useLoaderData } from "react-router-dom";
import API_URL from "../utils/urls.js";
import { useState } from "react";

import token from "../utils/token.js";

import styled from "styled-components";
import EntryForm from "../components/EntryForm";
import GuestbookEntry from "../components/GuestbookEntry";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StyledList = styled.ul``;

const Bulletin = () => {
  const messageData = useLoaderData();

  const [entryContent, setEntryContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };

  const handleFormSubmit = () => {
    fetch(`${API_URL}/bulletin/`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: entryContent,
        postedBy: messageData.postedBy,
      }),
    });
  };

  return (
    <StyledWrapper>
      Bulletin board
      <EntryForm
        value={entryContent}
        onSubmit={handleFormSubmit}
        onChange={handleNewText}
      />
      <StyledList>
        {messageData.body.messages.map((message) => {
          return <GuestbookEntry key={message._id} message={message} />;
        })}
      </StyledList>
    </StyledWrapper>
  );
};

export default Bulletin;
