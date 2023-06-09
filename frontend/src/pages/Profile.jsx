import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import ProfileMenu from "../pages/ProfileMenu";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: aliceblue;
`;

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const profileData = useLoaderData();
  const loggedInId = useOutletContext();
  console.log(profileData);
  console.log(loggedInId);
  return (
    <StyledContainer>
      <ProfileMenu user={profileData} />
      <Outlet context={{ profileData: profileData, loggedInId: loggedInId }} />
    </StyledContainer>
  );
};

export default Profile;
