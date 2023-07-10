/* eslint-disable react/prop-types */
import { useState } from "react";

import styled from "styled-components";

import LikeButton from "./LikeButton";
import LikeList from "./LikeList";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StyledContainer = styled.div``;

const Likes = ({ entry }) => {
  const [likeList, setLikeList] = useState(entry.likes);

  return (
    <StyledWrapper>
      <StyledContainer>
        <LikeButton entry={entry} setLikeList={setLikeList} />
      </StyledContainer>
      <StyledContainer>
        <LikeList likeList={likeList} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Likes;
