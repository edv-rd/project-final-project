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

const ProfileCard = ({ user }) => {
  return (
    <StyledContainer>
      <ProfilePicture user={user} />
      <Link to={`/${user._id}/profile`}>{user.name}</Link>
    </StyledContainer>
  );
};

export default ProfileCard;
