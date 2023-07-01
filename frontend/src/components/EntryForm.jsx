/* eslint-disable react/prop-types */
import styled from "styled-components";

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
      <button type="submit">Post!</button>
    </StyledForm>
  );
};

export default EntryForm;
