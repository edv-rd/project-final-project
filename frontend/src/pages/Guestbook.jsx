import { useLoaderData, Link } from "react-router-dom";
import GuestbookForm from "../components/GuestbookForm";

const Guestbook = () => {
  let guestbookMessages = [];
  const guestbookMessagesData = useLoaderData();

  const guestbookOwner = guestbookMessagesData.response.guestbookOwner;
  guestbookMessages = guestbookMessagesData.response.guestbookMessages;

  return (
    <>
      <h1>GuestBook</h1>
      <GuestbookForm owner={guestbookOwner} />
      {guestbookMessages.map((message) => {
        return (
          <>
            <p key={message._id}>
              {" "}
              {message.content} from:{" "}
              <Link to={`/profile/${message.postedBy._id}`}>
                {message.postedBy.name}
              </Link>{" "}
              kl {message.postedAt}
            </p>
          </>
        );
      })}
    </>
  );
};

export default Guestbook;
