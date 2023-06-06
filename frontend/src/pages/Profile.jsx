import { Outlet, useLoaderData } from "react-router-dom";
import ProfileMenu from "../pages/ProfileMenu";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const profileData = useLoaderData();
  return (
    <StyledContainer>
      <ProfileMenu user={profileData} />
      <Outlet />
    </StyledContainer>
  );
};

export default Profile;
