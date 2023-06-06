import { Link } from "react-router-dom";

import styled from "styled-components";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const HeaderMenu = ({ user }) => {
  const handleLogOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };
  return (
    <StyledHeaderContainer>
      logged in {user.name}
      <Link to={`${user._id}/profile`}>You</Link>
      <Link to={`/profile/edit`}>Edit profile</Link>
      <Link to={`${user._id}/guestbook/`}>Guestbook</Link>
      <Link to={`${user._id}/journal/`}>Journal</Link>
      <a href="#" onClick={handleLogOut}>
        Log out
      </a>
    </StyledHeaderContainer>
  );
};

export default HeaderMenu;
