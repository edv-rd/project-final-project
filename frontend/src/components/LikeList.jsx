/* eslint-disable react/prop-types */
const LikeList = ({ likeList }) => {
  if (!likeList.length) {
    return <p>No likes yet...</p>;
  } else if (likeList.length === 1) {
    return <p>{likeList[0].name} likes this.</p>;
  } else if (likeList.length === 2) {
    return (
      <p>
        {likeList[0].name} and {likeList[1].name} likes this.
      </p>
    );
  } else if (likeList.length === 3) {
    return (
      <p>
        {likeList[0].name}, {likeList[1].name} and {likeList[2].name} likes
        this.
      </p>
    );
  } else if (likeList.length === 4) {
    return (
      <p>
        {likeList[0].name}, {likeList[1].name} and {likeList.length - 1} more
        likes this.
      </p>
    );
  } else if (likeList.length >= 5) {
    return (
      <p>
        {likeList[0].name}, {likeList[1].name} and {likeList.length - 2} more
        likes this.
      </p>
    );
  } else {
    return <p></p>;
  }
};

export default LikeList;
