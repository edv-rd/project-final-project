import { useOutletContext } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 10px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// eslint-disable-next-line react/prop-types
const ProfileView = () => {
  const context = useOutletContext();
  const profileData = context.profileData;

  return (
    <StyledWrapper>
      <ProfileCard user={profileData} />
      <StyledContainer>
        <StyledTextContainer>
          <h2>About</h2>
          <p>{profileData.profile.about_me}</p>
        </StyledTextContainer>
        <StyledTextContainer>
          <h2>Interests</h2>
          <p>{profileData.profile.interests}</p>
        </StyledTextContainer>
        <StyledTextContainer>
          <h2>Occupation</h2>
          <p>{profileData.profile.occupation}</p>
        </StyledTextContainer>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default ProfileView;
