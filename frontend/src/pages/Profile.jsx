import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// eslint-disable-next-line react/prop-types
const Profile = ({ API_URL }) => {
  const [profileData, setProfileData] = useState({});
  const token = cookies.get("token");

  const fetchProfile = () => {
    fetch(`${API_URL}/profile`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => setProfileData(responseData));
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <h1>Profile {profileData.name}</h1>
      <h2>Email {profileData.email}</h2>
    </>
  );
};

export default Profile;
