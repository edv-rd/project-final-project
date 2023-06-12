import { Link } from "react-router-dom";

import styled from "styled-components";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`;

const StyledLinkContainer = styled.div`
  padding: 5px;
  height: 100%;
  cursor: pointer;
  &:hover {
    background-color: red;
    text-decoration: underline;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;
const HeaderMenu = ({ user }) => {
  const handleLogOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };
  return (
    <StyledHeaderContainer>
      <StyledLinkContainer>
        <StyledLink to={`${user._id}/profile`}>{user.name}</StyledLink>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <StyledLink to={`/profile/edit`}>Edit profile</StyledLink>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <StyledLink to={`${user._id}/guestbook/`}>Guestbook</StyledLink>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <StyledLink to={`/inbox/`}>Inbox</StyledLink>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <StyledLink to={`${user._id}/journal/`}>Journal</StyledLink>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <a onClick={handleLogOut}>Log out</a>
      </StyledLinkContainer>
    </StyledHeaderContainer>
  );
};

export default HeaderMenu;
