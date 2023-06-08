import HeaderMenu from "./pages/HeaderMenu";
import { Outlet, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const StyledHeaderWrapper = styled.div`
  background-color: grey;
  padding: 20px;
`;

const StyledContainer = styled.div``;

const Community = () => {
  const data = useLoaderData();
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledHeaderWrapper>
          <HeaderMenu user={data.response.user} />
        </StyledHeaderWrapper>
        <Outlet />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Community;
