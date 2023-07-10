/* eslint-disable react/prop-types */
import { likeEntry } from "../utils/entry";

const LikeButton = ({ entry, setLikeList }) => {
  const handleOnClick = () => {
    likeEntry(entry._id).then((res) => {
      console.log(res.entry.likes);
      setLikeList(res.entry.likes);
    });
  };
  return (
    <button type="button" onClick={handleOnClick}>
      Like!
    </button>
  );
};

export default LikeButton;
