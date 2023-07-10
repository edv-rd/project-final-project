import { useLoaderData, useOutletContext } from "react-router-dom";

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
  const user = useOutletContext();

  const [entryContent, setEntryContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };

  const handleFormSubmit = () => {
    const fetch = {
      endpoint: "bulletin",
      method: "POST",
      body: JSON.stringify({
        content: entryContent,
        postedBy: user[0],
      }),
    };

    fetchAuth(fetch).then((res) => console.log(res));
  };

  return (
    <StyledWrapper>
      Bulletin board
      <EntryForm
        value={entryContent}
        onSubmit={handleFormSubmit}
        onChange={handleNewText}
      />
      {messageData.body.messages && (
        <StyledList>
          {messageData.body.messages.map((message) => {
            console.log(message);
            return <Entry key={message._id} entry={message} />;
          })}
        </StyledList>
      )}
    </StyledWrapper>
  );
};

export default Bulletin;
