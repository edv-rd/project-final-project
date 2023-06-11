import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProfileView = () => {
  const profileData = useLoaderData();
  return (
    <>
      <h1>
        {profileData.name} is {profileData.profile.status}
      </h1>
      <h2>Email {profileData.email}</h2>
      <h2>About</h2>
      <p>{profileData.profile.about_me}</p>
      <h2>Interests</h2>
      <p>{profileData.profile.interests}</p>
      <h2>Occupation</h2>
      <p>{profileData.profile.occupation}</p>
    </>
  );
};

export default ProfileView;
