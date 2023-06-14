/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const StyledNotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

const StyledNotification = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: center;
  width: 100%;
  background-color: ${(props) =>
    props.variant === "message"
      ? "white"
      : props.variant === "error"
      ? "red"
      : "lightyellow"};
`;

const StyledNotificationText = styled.p`
  color: black;
  font-size: 15px;
`;

const Notification = ({ variant, message }) => {
  const [hidden, setHidden] = useState(false);

  const handleHideNotification = () => {
    setHidden(!hidden);
  };

  return (
    <>
      <StyledNotificationWrapper variant={variant} hidden={hidden}>
        <StyledNotification onClick={() => handleHideNotification()}>
          <StyledNotificationText>{message}</StyledNotificationText>
        </StyledNotification>
      </StyledNotificationWrapper>
    </>
  );
};

export default Notification;
