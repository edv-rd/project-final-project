/* eslint-disable react/prop-types */

const LikeButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      Like!
    </button>
  );
};

export default LikeButton;
