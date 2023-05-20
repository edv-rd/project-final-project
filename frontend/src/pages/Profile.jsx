import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Profile = ({ API_URL }) => {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    fetch(`${API_URL}profile`, {
      method: "POST",
      headers: {
        Authorization:
          "f6e6342235e9f9cefaf6e98f7715b7f88fdbca0d84f4447d0169460ce77e8d6a210763a9ed16c63173bfe44f667adca00e3ea9e696bd92fbd26511e47606bad06913c670179d51701a93e41ff69eb8c99316f5ab9d38b0eb1f81af2ae6e99e98e3cd66f768e6a54505bc1612c7614164ec7c7308eb445eb6ce70bad26bd42be8",
      },
    })
      .then((response) => response.json())
      .then((responseData) => setProfileData(responseData));
  }, [API_URL]);
  return <h1>Profile {profileData.name}</h1>;
};

export default Profile;
