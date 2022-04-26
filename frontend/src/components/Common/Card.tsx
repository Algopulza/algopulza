import styled from "styled-components";
import NumberFormat from 'react-number-format';

// 현재 코드라인이 100줄이 넘어가므로 세분화가 필요할 듯
// 아래 Item 부분에 대한 세분화가 가능할 듯

const Link = styled.a`
  text-decoration: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5vw;
  width: 17vw;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.25);
`;

const TopContainer = styled.div`
  color: white;
  background-color: black;
  border-radius: 15px 15px 0 0;
  padding: 16px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

const TagTitle = styled.div`
  font-size: 0.8vw;
  margin-right: 16px;
`;

const Id = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  font-size: 0.8vw;
`;

const Title = styled.div`
  padding: 0 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.7vw;
  padding: 0.5rem;
  text-align: center;
`;

const TextContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 16px 16px;
  color: black;
  border-radius: 0 0 15px 15px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ItemValue = styled.div`
  margin-bottom: 8px;
  font-size: 1vw;
`;

const ItemTitle = styled.div`
  font-size: 0.8vw;
`;

const Card = ({ tags, id, title, level, average, accept }: any) => {
  // const Card = () => {
    const averages = Math.round(average*100)/100;
    const accept2 = "" + accept
    const accepts = accept2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return (
    <Link href={"https://www.acmicpc.net/problem/" + id} target="_blank">
    <Container>
      <TopContainer>
        <Tag>
          {tags && Object.entries(tags).map(([key, value]:any) => (
          <TagTitle key={key}>{value}</TagTitle>
          ))}
        </Tag>
        <Id>#{id}</Id>
        <Title>{title}</Title>
      </TopContainer>

      <TextContainer>
        <Item>
          <ItemValue>{level}</ItemValue>
          <ItemTitle>레벨</ItemTitle>
        </Item>

        <Item>
          <ItemValue>{averages}</ItemValue>
          <ItemTitle>평균 시도 횟수</ItemTitle>
        </Item>

        <Item>
          <ItemValue>{accepts}</ItemValue>
          <ItemTitle>맞힌 사람 수</ItemTitle>
        </Item>
      </TextContainer>
    </Container>
    </Link>
  );
};

export default Card;