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
  console.log(guestbookMessagesData);
  console.log(guestbookMessagesData.response.guestbookOwner);

  const guestbookOwner = guestbookMessagesData.response.guestbookOwner;
  const guestbookMessages = guestbookMessagesData.response.guestbookMessages;

  const [entryContent, setEntryContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };

  const handleFormSubmit = () => {
    const fetch = {
      endpoint: "guestbook",
      id: guestbookOwner,
      method: "POST",
      body: JSON.stringify({
        content: entryContent,
      }),
    };

    fetchAuth(fetch).then((res) => console.log(res));
  };

  // TODO: do this better
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledNameTitle>Guestbook</StyledNameTitle>
        <EntryForm
          onSubmit={handleFormSubmit}
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
