import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import EntryForm from "../components/EntryForm";
import API_URL from "../utils/urls.js";

import Entry from "../components/Entry";
import styled from "styled-components";

import token from "../utils/token.js";

const StyledWrapper = styled.div``;

const StyledContainer = styled.div``;

const StyledNameTitle = styled.h1``;

const Guestbook = () => {
  const guestbookMessagesData = useLoaderData();

  const guestbookOwner = guestbookMessagesData.response.guestbookOwner;
  const guestbookMessages = guestbookMessagesData.response.guestbookMessages;

  const [entryContent, setEntryContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };

  const handleFormSubmit = () => {
    fetch(`${API_URL}/guestbook/${guestbookOwner}`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: entryContent,
        postedTo: guestbookOwner,
      }),
    });
  };

  // TODO: do this better
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledNameTitle>Guestbook</StyledNameTitle>
        <EntryForm
          handleFormSubmit={handleFormSubmit}
          value={entryContent}
          onChange={handleNewText}
        />
        {guestbookMessages.map((message) => {
          return <Entry key={message._id} entry={message} />;
        })}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Guestbook;
