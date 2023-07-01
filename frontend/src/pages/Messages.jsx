import { useLoaderData } from "react-router-dom";
import Entry from "../components/Entry";
import styled from "styled-components";

const StyledWrapper = styled.div``;
const StyledList = styled.ul``;

const Messages = () => {
  const messageData = useLoaderData();

  return (
    <StyledWrapper>
      Messages
      <StyledList>
        {messageData.body.messages.map((message) => {
          return <Entry key={message._id} entry={message} />;
        })}
      </StyledList>
    </StyledWrapper>
  );
};

export default Messages;
