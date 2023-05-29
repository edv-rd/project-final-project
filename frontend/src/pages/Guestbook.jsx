import { useLoaderData } from "react-router-dom";

const Guestbook = () => {
  let guestbookMessages = [];
  const guestbookMessagesData = useLoaderData();
  guestbookMessages = guestbookMessagesData.response.guestbookMessages;
  console.log(guestbookMessages);

  return (
    <>
      <h1>GuestBook</h1>
      <p>{guestbookMessages[1].content}</p>
      {guestbookMessages.forEach((message) => {
        return <p>Text: {message.postedBy}</p>;
      })}
    </>
  );
};

export default Guestbook;
