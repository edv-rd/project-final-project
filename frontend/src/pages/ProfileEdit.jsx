import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import UploadForm from "../components/UploadForm";
import API_URL from "../utils/urls";

import styled from "styled-components";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileEdit = () => {
  const loadedData = useLoaderData();

  const [aboutMeText, setAboutMeText] = useState(
    `${loadedData.response.user.profile.about_me}`
  );
  const [interestsText, setInterestsText] = useState(
    `${loadedData.response.user.profile.interests}`
  );
  const [occupationText, setOccupationText] = useState(
    `${loadedData.response.user.profile.occupation}`
  );
  const [textUpdated, setTextUpdated] = useState(false);

  const handleNewText = (event) => {
    setTextUpdated(true);
    const inputText = event.target.value;
    switch (event.target.id) {
      case "about_me":
        setAboutMeText(inputText);
        break;
      case "interests":
        setInterestsText(inputText);
        break;
      case "occupation":
        setOccupationText(inputText);
        break;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTextUpdated(false);

    fetch(`${API_URL}/profile/edit`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        about_me: aboutMeText,
        interests: interestsText,
        occupation: occupationText,
      }),
    });
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <h1>{loadedData.response.user.name}</h1>
      </StyledContainer>
      <StyledContainer>
        <form onSubmit={handleFormSubmit}>
          <h2>About</h2>
          <textarea
            id="about_me"
            placeholder={aboutMeText}
            value={aboutMeText}
            onChange={handleNewText}
          />
          <h2>Interests</h2>
          <textarea
            id="interests"
            placeholder={interestsText}
            value={interestsText}
            onChange={handleNewText}
          />
          <h2>Occupation</h2>
          <textarea
            id="occupation"
            placeholder={occupationText}
            value={occupationText}
            onChange={handleNewText}
          />
          <button type="submit" disabled={!textUpdated}>
            Update profile
          </button>
        </form>
        <UploadForm owner={loadedData.response.user._id} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default ProfileEdit;
