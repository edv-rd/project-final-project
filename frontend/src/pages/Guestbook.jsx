import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import fetchAuth from "../utils/fetch";
import EntryForm from "../components/EntryForm";

import Entry from "../components/Entry";
import styled from "styled-components";

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
    const fetchBody = JSON.stringify({
      content: entryContent,
      postedTo: guestbookOwner,
    });

    fetchAuth(`/guestbook/${guestbookOwner}`, "POST", fetchBody);
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
