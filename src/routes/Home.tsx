import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const SubContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  flex-direction: column;
`;

const Home = () => {
    return (
        <>
        <Container>
          <SubContainer>
            <Navbar />
            <Outlet />
            <Footer />
          </SubContainer>
        </Container>
      </>
    );
};

export default Home;