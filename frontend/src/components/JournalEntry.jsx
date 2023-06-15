/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledWrapper = styled.div``;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const JournalEntry = ({ entry }) => {
  console.log(entry);
  return (
    <StyledWrapper>
      <StyledContainer>
        <h2>
          {entry.title} - {entry.postedAt}
        </h2>
        <p>{entry.content}</p>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default JournalEntry;
