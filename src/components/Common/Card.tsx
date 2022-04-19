import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 5rem 1rem;
  width: 330px;
  height: 220px;
  border-radius: 15px;
  border: 1px solid #c4c4c4;
`;

const TopContainer = styled.div`
  color: white;
  background-color: black;
  height:140px;
  border-radius: 15px 15px 0 0;
  padding: 1rem;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;
  width: 100%;
  height: 16px;
`;

const TagTitle = styled.div`
    font-size: 1rem;
    margin-right: 1rem;
`

const Id = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
  height: 16px;
`

const Title = styled.div`
display: flex;
justify-content: center;
overflow: hidden;
text-overflow: ellipsis;
    font-size: 2rem;
    margin-top:1.5rem;
`

const TextContainer = styled.div`
  padding: 0.5rem 1rem 0rem 1rem;
  height:80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Level = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
height: 100%;
text-align: center;
`

const LevelTop = styled.div``
const LevelBottom = styled.div``
const Try = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
height: 100%;
text-align: center;
`

const TryTop = styled.div``
const TryBottom = styled.div``
const Answer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
height: 100%;
text-align: center;
`

const AnswerTop = styled.div``
const AnswerBottom = styled.div``

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
        <Title>Title</Title>
      </TopContainer>
      <TextContainer>
        <Level>
          <LevelTop>Gold3</LevelTop>
          <LevelBottom>레벨</LevelBottom>
        </Level>
        
        <Try>
          <TryTop>30</TryTop>
          <TryBottom>평균 시도 횟수</TryBottom>
        </Try>

        <Answer>
          <AnswerTop>1005</AnswerTop>
          <AnswerBottom>맞힌 사람 수</AnswerBottom>
        </Answer>

      </TextContainer>
    </Container>
  );
};

export default Card;
