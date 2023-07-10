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
  return (
    <StyledContainer>
      <ProfileMenu user={profileData._id} />
      <Outlet context={useOutletContext()} />
    </StyledContainer>
  );
};

export default Profile;
