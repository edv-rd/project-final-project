/* eslint-disable react/prop-types */
import API_URL from "../utils/urls.js";
import { useState } from "react";
import styled from "styled-components";
import token from "../utils/token.js";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

    fetch(`${API_URL}/journal/`, {
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
    <StyledWrapper>
      <StyledForm onSubmit={handleFormSubmit}>
        <h2>Journal entry</h2>
        <textarea
          id="title"
          value={titleContent}
          onChange={handleNewTitle}
          placeholder="title"
        />
        <textarea id="content" value={entryContent} onChange={handleNewText} />

        <button type="submit">Post!</button>
      </StyledForm>
    </StyledWrapper>
  );
};

export default JournalForm;
