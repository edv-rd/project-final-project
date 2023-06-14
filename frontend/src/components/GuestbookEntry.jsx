/* eslint-disable react/prop-types */
import styled from "styled-components";
import ProfileCard from "./ProfileCard";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-bottom: 2px solid black;
  padding: 5px;

  :hover {
    background-color: aliceblue;
  }
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledParagraph = styled.p`
  margin-bottom: 10px;
`;

const GuestbookEntry = ({ message }) => {
  return (
    <StyledContainer>
      <ProfileCard user={message.postedBy} />
      <StyledText>
        <StyledParagraph>{message.postedAt}</StyledParagraph>
        <StyledParagraph>{message.content}</StyledParagraph>
      </StyledText>
    </StyledContainer>
  );
};

export default GuestbookEntry;
