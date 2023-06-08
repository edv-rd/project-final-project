import "./App.css";
import Community from "./Community";
import Profile from "./pages/Profile";
import ProfileView from "./pages/ProfileView";
import ProfileEdit from "./pages/ProfileEdit";
import Login from "./pages/Login";
import Guestbook from "./pages/Guestbook";
import Journal from "./pages/Journal";
import Messages from "./pages/Messages";
import MessageForm from "./components/MessageForm";
import API_URL from "./utils/urls";

import styled from "styled-components";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 10px 10px;
  grid-template-areas:
    "."
    ".";
  margin: 0 auto;
`;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

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
        path: ":profileId/",
        element: <Profile />,
        loader: async ({ params }) => {
          return fetch(`${API_URL}/profile/${params.profileId}`);
        },
        children: [
          {
            path: "profile",
            element: <ProfileView />,
            loader: async ({ params }) => {
              return fetch(`${API_URL}/profile/${params.profileId}`);
            },
          },
          {
            path: "guestbook",
            element: <Guestbook />,
            loader: async ({ params }) => {
              return fetch(`${API_URL}/guestbook/${params.profileId}`);
            },
          },
          {
            path: "journal",
            element: <Journal />,
            loader: async ({ params }) => {
              return fetch(`${API_URL}/journal/${params.profileId}`, {
                method: "GET",
                headers: {
                  Authorization: `${token}`,
                },
              });
            },
          },
          {
            path: "message",
            element: <MessageForm />,
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
      {
        path: "inbox",
        element: <Messages />,
        loader: async () => {
          return fetch(`${API_URL}/inbox`, {
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
    <StyledWrapper>
      {token ? <RouterProvider router={router} /> : <Login API_URL={API_URL} />}
    </StyledWrapper>
  );
}

export default App;
