import styled from "styled-components";
import logo from 'assets/img/reading_glasses.png'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 10rem;
  margin-top:auto;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #DEDEDE;
  color: #FFB305;
  width: 20%;
  padding: 2rem 0;
`;

const Title = styled.div`
font-size: 3rem;
font-family: 'GmarketSansBold';
`

const Sub = styled.div`

`


const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  width: 80%;
  padding: 2.5rem;
`;

const Sitemap = styled.div`
  display: flex;
  flex-direction: row;
  width:35%;
`

const TextMain = styled.div`
font-family: 'GmarketSansBold';
margin-bottom: 0.5rem;
margin-right: 3rem;

`

const RightSitemap = styled.div`
display: flex;
flex-direction: row;
`

const RightSitemapLeft = styled.div`
`

const RightSitemapRight = styled.div`
`

const Text = styled.div`
margin-right: 3rem;
margin-bottom:2rem;
a{
  text-decoration: none;
  color: white;
}
`


const Team = styled.div`
  display: flex;
  flex-direction: row;
  width: 45%;
  margin-left: 50px;
`;

const TeamName = styled.div`
  width: 25%;
`;

const PersonName = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
`;

const PersonNameLeft = styled.div`
`

const PersonNameMiddle = styled.div`
`

const PersonNameRight = styled.div`
`

const Phrases = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 35%;
`;

const Footer = () => {
  return (
    <Container>
      <LeftContainer>
        <img src={logo} />
        <Title>알고 풀자</Title>
        <Sub>자신에게 맞는 알고리즘 문제를 알고 풀자</Sub>
      </LeftContainer>
      
        <RightContainer>

        <Sitemap>
            <TextMain>SITE MAP</TextMain>

            <RightSitemap>
              <RightSitemapLeft>
                <Text><a href="/recommend">추천</a></Text>
                <Text><a href="/category">카테고리</a></Text>
              </RightSitemapLeft>
              <RightSitemapRight>
                <Text><a href="/random">랜덤</a></Text>
                <Text><a href="/analysis">분석</a></Text>
              </RightSitemapRight>
            </RightSitemap>
          </Sitemap>

          <Team>
            <TeamName>
              <TextMain>A408</TextMain>
              <TextMain>MEMBERS</TextMain>
            </TeamName>

            <PersonName>
              <PersonNameLeft>
                <Text>SANGHYUN</Text>
                <Text>MINJEONG</Text>
              </PersonNameLeft>
              <PersonNameMiddle>
                <Text>DONGWON</Text>
                <Text>HYEJI</Text>
              </PersonNameMiddle>
              <PersonNameRight>
                <Text>JUNBEOM</Text>
                <Text>WONSIK</Text>
              </PersonNameRight>
            </PersonName>
          </Team>

          <Phrases>
            <TextMain>안녕하세요</TextMain>
            <TextMain>개발자가 좋아하는 리듬</TextMain>
            <TextMain>algorithm</TextMain>
          </Phrases>
        </RightContainer>
    </Container>
  );
};

export default Footer;
