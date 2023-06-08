import { Link } from "react-router-dom";

import styled from "styled-components";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const HeaderMenu = ({ user }) => {
  const handleLogOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };
  return (
    <StyledHeaderContainer>
      logged in <Link to={`${user._id}/profile`}>{user.name}</Link>
      <Link to={`/profile/edit`}>Edit profile</Link>
      <Link to={`${user._id}/guestbook/`}>Guestbook</Link>
      <Link to={`/inbox/`}>Inbox</Link>
      <Link to={`${user._id}/journal/`}>Journal</Link>
      <a onClick={handleLogOut}>Log out</a>
    </StyledHeaderContainer>
  );
};

export default HeaderMenu;
