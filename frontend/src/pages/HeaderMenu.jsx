import { Link } from "react-router-dom";

const HeaderMenu = ({ user }) => {
  return (
    <>
      logged in {user.name}
      <Link to={`/profile/${user._id}`}>You</Link>
      <Link to={`/profile/edit`}>Edit profile</Link>
      <Link to={`/guestbook/${user._id}`}>Guestbook</Link>
    </>
  );
};

export default HeaderMenu;
