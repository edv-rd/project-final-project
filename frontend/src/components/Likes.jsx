/* eslint-disable react/prop-types */
import { useState } from "react";

import styled from "styled-components";

import LikeButton from "./LikeButton";
import LikeList from "./LikeList";
import { likeEntry } from "../utils/entry";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StyledContainer = styled.div``;

const Likes = ({ entry }) => {
  const [likeList, setLikeList] = useState(entry.likes);

  const handleOnClick = () => {
    likeEntry(entry._id).then((res) => {
      console.log(res.entry.likes);
      setLikeList(res.entry.likes);
    });
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <LikeButton
          entry={entry}
          setLikeList={setLikeList}
          onClick={handleOnClick}
        />
      </StyledContainer>
      <StyledContainer>
        <LikeList likeList={likeList} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Likes;
