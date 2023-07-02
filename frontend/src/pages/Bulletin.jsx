import { useLoaderData } from "react-router-dom";

import { useState } from "react";

import fetchAuth from "../utils/fetch";

import styled from "styled-components";
import EntryForm from "../components/EntryForm";
import Entry from "../components/Entry";

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
    const fetchBody = JSON.stringify({
      content: entryContent,
      postedBy: messageData.postedBy,
    });

    fetchAuth("bulletin", "POST", fetchBody);
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
          console.log(message);
          return <Entry key={message._id} entry={message} />;
        })}
      </StyledList>
    </StyledWrapper>
  );
};

export default Bulletin;
