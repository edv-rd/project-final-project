import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import fetchAuth from "../utils/fetch.js";
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

const Journal = () => {
  const journalDataRaw = useLoaderData();
  const user = useOutletContext();

  const [entryContent, setEntryContent] = useState("");
  const [titleContent, setTitleContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };
  const handleNewTitle = (event) => {
    setTitleContent(event.target.value);
  };

  const handleFormSubmit = () => {
    const fetch = {
      endpoint: "journal",
      method: "POST",
      body: JSON.stringify({
        title: titleContent,
        content: entryContent,
        postedBy: user,
      }),
    };

    fetchAuth(fetch).then((res) => console.log(res));

    //event.preventDefault();
  };

  return (
    <StyledWrapper>
      <h1>Journal!</h1>
      {journalDataRaw.body.owner === user && (
        <EntryForm
          value={entryContent}
          onChange={handleNewText}
          onSubmit={handleFormSubmit}
          titleValue={titleContent}
          titleOnChange={handleNewTitle}
        />
      )}
      {journalDataRaw.body.journalEntries && (
        <StyledList>
          {journalDataRaw.body.journalEntries.map((entry) => {
            return <Entry key={entry._id} entry={entry} />;
          })}
        </StyledList>
      )}
    </StyledWrapper>
  );
  // TODO: on click on entry, show it
};

export default Journal;
