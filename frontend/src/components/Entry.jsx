/* eslint-disable react/prop-types */
import styled from "styled-components";
import ProfileCard from "./ProfileCard";

import Likes from "./Likes";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-bottom: 2px solid black;
  padding: 5px;
  background-color: ${(props) => (props.$read ? "white" : "red")};

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

const Entry = ({ entry, showLikes }) => {
  return (
    <StyledContainer $read={entry.read}>
      <ProfileCard user={entry.postedBy} />
      <StyledText>
        <StyledParagraph>{entry.postedAt}</StyledParagraph>
        {entry.title && <StyledParagraph>{entry.title}</StyledParagraph>}
        <StyledParagraph>{entry.content}</StyledParagraph>
        {showLikes && <Likes entry={entry} />}
      </StyledText>
    </StyledContainer>
  );
};

export default Entry;
