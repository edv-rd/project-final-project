import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const profileData = useLoaderData();
  return (
    <>
      <h1>{profileData.name}</h1>
      <h2>About</h2>
      <p>{profileData.profile.about_me}</p>
      <h2>Interests</h2>
      <p>{profileData.profile.interests}</p>
      <h2>Occupation</h2>
      <p>{profileData.profile.occupation}</p>
      <h2>Email {profileData.email}</h2>
    </>
  );
};

export default Profile;
