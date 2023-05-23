import React from "react";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Button from "./lib/Button";
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
        <>
          <Profile API_URL={API_URL} />
          <Button handleClick={logout} text="Log out!" variant="warning" />
        </>
      ) : (
        <Login API_URL={API_URL} />
      )}
    </>
  );
};

export default Community;
