import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const profileData = useLoaderData();

  return (
    <>
      <h1>Profile {profileData.name}</h1>
      <h2>Email {profileData.email}</h2>
    </>
  );
};

export default Profile;
