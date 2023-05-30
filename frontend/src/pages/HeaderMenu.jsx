import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const HeaderMenu = ({ user }) => {
  const handleLogOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };
  return (
    <>
      logged in {user.name}
      <Link to={`/profile/${user._id}`}>You</Link>
      <Link to={`/profile/edit`}>Edit profile</Link>
      <Link to={`/guestbook/${user._id}`}>Guestbook</Link>
      <Link to={`/journal/${user._id}`}>Journal</Link>
      <a href="#" onClick={handleLogOut}>
        Log out
      </a>
    </>
  );
};

export default HeaderMenu;
