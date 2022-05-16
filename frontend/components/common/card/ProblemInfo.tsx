import styled from "styled-components";

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  font-size: 0.9vw;
  color: #9b9b9b;
`;

const Value = styled.p`
  margin: 0;
  font-size: 0.9vw;
  color: #000000;
`;

type BodyProps = {
  id: number;
  tier: string;
  level: number;
  accept: number;
};

export default function ProblemInfo({ id, tier, level, accept }: BodyProps) {
  return (
    <Container>
      <Item>
        <Title>ID</Title>
        <Value>{id}</Value>
      </Item>

      <Item>
        <Title>TIER</Title>
        <Value>{tier + " " + level.toString()}</Value>
      </Item>

      <Item>
        <Title>SOL</Title>
        <Value>{accept.toLocaleString("ko-KR")}</Value>
      </Item>
    </Container>
  );
}
