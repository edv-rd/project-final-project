import React, { useState } from "react";
import Button from "../lib/Button";
import styled from "styled-components";

const StyledForm = styled.form``;

const LoginRegisterForm = ({
  state,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleFormSubmit,
}) => {
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit(event, state);
      }}
    >
      {state === "register" && (
        <input
          type="text"
          name="name"
          value={name}
          placeholder="enter your name"
          onChange={handleNameChange}
        />
      )}
      <input
        type="email"
        name="email"
        value={email}
        placeholder="enter your email"
        onChange={handleEmailChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="enter your password"
        onChange={handlePasswordChange}
      />
      <Button
        type="submit"
        text={state === "login" ? "Login!" : "Register!"}
        variant={state === "login" ? "confirm" : "warning"}
      />
    </StyledForm>
  );
};

export default LoginRegisterForm;
