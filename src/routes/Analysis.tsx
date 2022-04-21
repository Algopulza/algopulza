import styled from "styled-components";
import UserInfo from "components/Analysis/UserInfo";
import Badge from "components/Analysis/Badge";
import Weakness from "components/Analysis/Weakness";
import Solved from "components/Analysis/Solved";
import Study from "components/Analysis/Study";

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

const SubContainer2 = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 0.5fr;
grid-column-gap: 1rem;
`;

const Analysis = () => {
  return (
    <Container>
      <SubContainer>
        <UserInfo />
        <Badge />
      </SubContainer>
      <SubContainer>
        <Weakness />
        <Solved />
      </SubContainer>
      {/* <SubContainer2>
        <Study />
      </SubContainer2> */}
    </Container>
  );
};

export default Analysis;
