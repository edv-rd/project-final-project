import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import BulletinForm from "../components/BulletinForm";
import GuestbookEntry from "../components/GuestbookEntry";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StyledList = styled.ul``;

const Bulletin = () => {
  const messageData = useLoaderData();

  return (
    <StyledWrapper>
      Bulletin board
      <BulletinForm />
      <StyledList>
        {messageData.body.messages.map((message) => {
          return <GuestbookEntry key={message._id} message={message} />;
        })}
      </StyledList>
    </StyledWrapper>
  );
};

export default Bulletin;
