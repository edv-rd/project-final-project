import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ProfileMenu = ({ user }) => {
  return (
    <StyledWrapper>
      <Link to={`/${user._id}/profile`}>{user.name}</Link>
      <Link to={`/${user._id}/guestbook`}>Guestbook</Link>
      <Link to={`/${user._id}/journal`}>Journal</Link>
    </StyledWrapper>
  );
};

export default ProfileMenu;
