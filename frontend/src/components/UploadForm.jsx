/* eslint-disable react/prop-types */
import { useState } from "react";

import Button from "../lib/Button";

import fetchAuth from "../utils/fetch.js";

const UploadForm = ({ owner }) => {
  const [image, setImage] = useState();

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", owner);

    fetchAuth("upload", "POST", formData);
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Button type="submit" text="Upload picture!" />
    </form>
  );
};

export default UploadForm;
