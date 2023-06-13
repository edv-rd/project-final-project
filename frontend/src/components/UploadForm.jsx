import { useState } from "react";
import API_URL from "../utils/urls";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const UploadForm = ({ owner }) => {
  const [image, setImage] = useState();

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", owner);

    fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    }).then((res) => console.log(res));
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Upload picture</button>
    </form>
  );
};

export default UploadForm;
