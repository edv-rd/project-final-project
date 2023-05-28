import "./App.css";
import Community from "./Community";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Login from "./pages/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const API_URL = "http://127.0.0.1:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Community />,
    loader: async () => {
      return fetch(`${API_URL}/auth/`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
    },
    // TODO: create error element,
    children: [
      {
        path: "profile/:profileId",
        element: <Profile />,
        loader: async ({ params }) => {
          return fetch(`${API_URL}/profile/${params.profileId}`);
        },
      },
      {
        path: "profile/edit",
        element: <ProfileEdit API_URL={API_URL} />,
        loader: async () => {
          return fetch(`${API_URL}/auth`, {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          });
        },
      },
    ],
  },
]);

function App() {
  return (
    <>
      {token ? <RouterProvider router={router} /> : <Login API_URL={API_URL} />}
    </>
  );
}

export default App;
