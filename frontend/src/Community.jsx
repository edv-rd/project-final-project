import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Button from "./lib/Button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Community = ({ API_URL }) => {
  const token = cookies.get("token");

  const logout = () => {
    // destroy the cookie
    cookies.remove("token", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <>
      {token ? (
        <BrowserRouter>
          <Button handleClick={logout} text="Log out!" variant="warning" />
          <Routes>
            <Route path="/" element={<Profile API_URL={API_URL} />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login API_URL={API_URL} />
      )}
    </>
  );
};

export default Community;
