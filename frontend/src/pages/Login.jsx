import { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import LoginRegisterForm from "../components/LoginRegisterForm";
import API_URL from "../utils/urls";

const Login = () => {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event, state) => {
    switch (state) {
      case "login":
        fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              cookies.set("token", data.response.accessToken, {
                path: "/",
              });
              window.location.href = "/";
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "register":
        fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              cookies.set("token", data.response.accessToken, {
                path: "/",
              });
              window.location.href = "/";
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  };

  const handleLoginOrRegister = () => {
    {
      loginOrRegister === "login"
        ? setLoginOrRegister("register")
        : setLoginOrRegister("login");
    }
  };

  return (
    <>
      <h1>Please log in first:</h1>
      <LoginRegisterForm
        state={loginOrRegister}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleFormSubmit={handleFormSubmit}
      />

      {loginOrRegister === "login" ? (
        <p>
          No account?{" "}
          <a href="#" onClick={handleLoginOrRegister}>
            Register!
          </a>
        </p>
      ) : (
        <p>
          Already registered?{" "}
          <a href="#" onClick={handleLoginOrRegister}>
            Login!
          </a>
        </p>
      )}
    </>
  );
};

export default Login;
