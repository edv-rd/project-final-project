import { Link } from "react-router-dom";

const HeaderMenu = ({ user }) => {
  return <Link to={`/profile/${user._id}`}>Profil</Link>;
};

export default HeaderMenu;
