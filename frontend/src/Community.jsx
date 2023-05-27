import HeaderMenu from "./pages/HeaderMenu";
import { Outlet, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Community = () => {
  const data = useLoaderData();
  return (
    <StyledContainer>
      <HeaderMenu user={data.response.user} />
      <Outlet />
    </StyledContainer>
  );
};

export default Community;
