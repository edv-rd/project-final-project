import "./App.css";
import Profile from "./pages/Profile";

const API_URL = "http://127.0.0.1:3000/";

function App() {
  return <Profile API_URL={API_URL} />;
}

export default App;
