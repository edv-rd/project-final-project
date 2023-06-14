import { useLoaderData } from "react-router-dom";
import GuestbookForm from "../components/GuestbookForm";
import GuestbookEntry from "../components/GuestbookEntry";
import styled from "styled-components";

const StyledWrapper = styled.div``;

const StyledContainer = styled.div``;

const StyledNameTitle = styled.h1``;

const Guestbook = () => {
  const guestbookMessagesData = useLoaderData();

  const guestbookOwner = guestbookMessagesData.response.guestbookOwner;
  const guestbookMessages = guestbookMessagesData.response.guestbookMessages;

  // TODO: do this better
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledNameTitle>
          Guestbook for {guestbookMessages[0].postedTo.name}
        </StyledNameTitle>
        <GuestbookForm owner={guestbookOwner} />
        {guestbookMessages.map((message) => {
          return <GuestbookEntry key={message._id} message={message} />;
        })}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Guestbook;
