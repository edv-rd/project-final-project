import "./App.css";
import Community from "./Community";

const API_URL = "http://127.0.0.1:3000";

function App() {
  return <Community API_URL={API_URL} />;
}

export default App;
