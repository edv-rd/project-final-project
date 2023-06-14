/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 5px;
  background-color: ${(props) =>
    props.variant === "confirm"
      ? "blue"
      : props.variant === "warning"
      ? "red"
      : "grey"};
`;

const Button = ({ handleClick, text, variant }) => {
  return (
    <StyledButton onClick={handleClick} variant={variant}>
      {text}
    </StyledButton>
  );
};

export default Button;
