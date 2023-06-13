import API_URL from "../utils/urls";

const ProfilePicture = ({ user }) => {
  return (
    <>
      {user.profile.image ? (
        <img src={`${API_URL}/${user._id}/image`} />
      ) : (
        <img src="http://placehold.co/100x150" />
      )}
    </>
  );
};

export default ProfilePicture;
