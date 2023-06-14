/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 5px;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const ProfileCard = ({ user }) => {
  return (
    <StyledContainer>
      <StyledLink to={`/${user._id}/profile`}>
        <ProfilePicture user={user} />
        {user.name}
      </StyledLink>
    </StyledContainer>
  );
};

export default ProfileCard;
