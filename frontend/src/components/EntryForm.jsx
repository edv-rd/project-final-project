/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../lib/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EntryForm = ({
  onSubmit,
  value,
  onChange,
  titleValue,
  titleOnChange,
}) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      {titleOnChange && (
        <textarea
          id="title"
          value={titleValue}
          onChange={titleOnChange}
          placeholder="Title"
        />
      )}
      <textarea id="content" value={value} onChange={onChange} />
      <Button type="submit" variant="confirm" text="Submit!" />
    </StyledForm>
  );
};

export default EntryForm;
