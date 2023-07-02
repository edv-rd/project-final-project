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

const Button = ({ handleClick, text, variant, disabled }) => {
  return (
    <StyledButton onClick={handleClick} variant={variant} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default Button;
