import styled from "styled-components";

// 현재 코드라인이 100줄이 넘어가므로 세분화가 필요할 듯
// 아래 Item 부분에 대한 세분화가 가능할 듯
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5vw;
  width: 17vw;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
`

const TopContainer = styled.div`
  color: white;
  background-color: black;
  border-radius: 15px 15px 0 0;
  padding: 16px;
`

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`

const TagTitle = styled.div`
  font-size: 0.8vw;
  margin-right: 16px;
`

const Id = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  font-size: 0.8vw;
`

const Title = styled.div`
  padding: 0 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.7vw;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 16px 16px;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ItemValue = styled.div`
  margin-bottom: 8px;
  font-size: 1vw;
`

const ItemTitle = styled.div`
  font-size: 0.8vw;
`

const Card = () => {
  return (
    <Container>
      <TopContainer>
        <Tag>
          <TagTitle>#Tag1</TagTitle>
          <TagTitle>#Tag2</TagTitle>
          <TagTitle>#Tag3</TagTitle>
        </Tag>
        <Id>id</Id>
        <Title>It has a very long title</Title>
      </TopContainer>

      <TextContainer>
        <Item>
          <ItemValue>Gold3</ItemValue>
          <ItemTitle>레벨</ItemTitle>
        </Item>

        <Item>
          <ItemValue>30</ItemValue>
          <ItemTitle>평균 시도 횟수</ItemTitle>
        </Item>

        <Item>
          <ItemValue>1005</ItemValue>
          <ItemTitle>맞힌 사람 수</ItemTitle>
        </Item>
      </TextContainer>
    </Container>
  )
}

export default Card
