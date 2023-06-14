import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div``;
const StyledList = styled.ul``;
const StyledListItem = styled.li``;

const Messages = () => {
  const messageData = useLoaderData();

  return (
    <StyledWrapper>
      Messages
      <StyledList>
        {messageData.body.messages.map((message) => {
          return (
            <StyledListItem key={message._id}>
              {message.title}
              {message.content}
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledWrapper>
  );
};

export default Messages;
