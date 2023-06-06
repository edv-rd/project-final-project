import { useLoaderData, Link } from "react-router-dom";
import GuestbookForm from "../components/GuestbookForm";

const Guestbook = () => {
  let guestbookMessages = [];
  const guestbookMessagesData = useLoaderData();

  const guestbookOwner = guestbookMessagesData.response.guestbookOwner;
  guestbookMessages = guestbookMessagesData.response.guestbookMessages;
  // TODO: do this better
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
              <Link to={`/${message.postedBy._id}/profile/`}>
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
