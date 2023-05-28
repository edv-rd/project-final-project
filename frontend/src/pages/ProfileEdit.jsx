import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const ProfileEdit = ({ API_URL }) => {
  const loadedData = useLoaderData();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    let loadedProfile = {
      about_me: loadedData.response.user.profile.about_me,
      interests: loadedData.response.user.profile.interests,
      occupation: loadedData.response.user.profile.occupation,
    };
    setProfileData(loadedProfile);
  }, []);

  const handleNewText = (event) => {
    const inputText = event.target.value;
    setProfileData({ [event.target.id]: inputText });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(`${API_URL}/profile/edit`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        about_me: profileData.about_me,
        interests: profileData.interests,
        occupation: profileData.occupation,
      }),
    });
  };

  return (
    <>
      <h1>{loadedData.response.user.name}</h1>
      <form onSubmit={handleFormSubmit}>
        <h2>About</h2>
        <textarea
          id="about_me"
          placeholder={profileData.about_me}
          value={profileData.about_me}
          onChange={handleNewText}
        />
        <h2>Interests</h2>
        <textarea
          id="interests"
          placeholder={profileData.interests}
          value={profileData.interests}
          onChange={handleNewText}
        />
        <h2>Occupation</h2>
        <textarea
          id="occupation"
          placeholder={profileData.occupation}
          value={profileData.occupation}
          onChange={handleNewText}
        />
        <button type="submit">Update profile</button>
      </form>
      <h2>Email {profileData.email}</h2>
    </>
  );
};

export default ProfileEdit;
