import styled from "styled-components";
import { ReactElement } from "react";
import Layout from "../../components/common/Layout";
// import UserInfo from "../../components/analysis/userInfo/userinfo";
// import Badge from "../../components/analysis/badge/badge";
// import Weakness from "../../components/analysis/weakness/weakness";
// import Solved from "../../components/analysis/solved/solved";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 4rem 10rem;
  max-height: 100vh;
`;

const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  grid-template-rows: 1fr 0.5fr;
  grid-column-gap: 1rem;
`;
export default function Analysis() {
  return (
    <Container>
      <SubContainer>
        {/* <UserInfo />
        <Badge /> */}
      </SubContainer>
      <SubContainer>
        {/* <Weakness />
        <Solved /> */}
      </SubContainer>
    </Container>
  );
}

Analysis.getLayout = function getLayout(analysis: ReactElement) {
  return <Layout>{analysis}</Layout>;
};