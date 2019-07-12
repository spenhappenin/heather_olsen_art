import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const MyLoader = () => (
  <LoaderContainer>
    <StyledLoader
      type="TailSpin"
      color="#00BFFF"
      height="100"
      width="100"
    />   
  </LoaderContainer>
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: #000000d9;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
`;

const StyledLoader = styled(Loader)`
  background: #0000009c;
`;

export default MyLoader;