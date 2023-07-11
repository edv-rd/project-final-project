/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import styled from "styled-components";

import LikeButton from "./LikeButton";
import LikeList from "./LikeList";
import { likeEntry } from "../utils/entry";
import fetchAuth from "../utils/fetch";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StyledContainer = styled.div``;

const Likes = ({ entry }) => {
  const [likeList, setLikeList] = useState(entry.likes);

  const fetchLikes = (entryId) => {
    const fetch = {
      endpoint: "entry/likes",
      method: "GET",
      id: `${entryId}`,
    };

    fetchAuth(fetch).then((res) => setLikeList(res));
  };

  const handleOnClick = () => {
    likeEntry(entry._id).then((res) => {
      setLikeList(res.entry.likes);
    });
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <LikeButton onClick={handleOnClick} />
      </StyledContainer>
      <StyledContainer>
        <LikeList likeList={likeList} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Likes;
