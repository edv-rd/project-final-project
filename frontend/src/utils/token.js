import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

export default token;