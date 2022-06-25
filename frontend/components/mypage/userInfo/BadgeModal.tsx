import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
`

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
`

const Badge = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.1fr 0.1fr;
  align-items: center;
  justify-content: center;
`

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  font-size: 0.9rem;
  font-weight: bold;
`

const Exp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  font-size: 0.7rem;
  font-weight: bold;
`

const Grade = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  font-size: 0.9rem;
  font-weight: bold;
`

const Point = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: bold;
`

const Title = styled.div`
  display: flex;
  margin-top: 5px;
  font-size: 0.9rem;
  font-weight: bold;
`

const Sub = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: 1rem;
  font-size: 0.7rem;
  font-weight: bold;
`

const BadgeModal = () => {
  return (
    <Container>
      <BadgeContainer>
        <Badge>
          <Image
            src={"/analysis/badge/seed1.png"}
            layout="responsive"
            width={300}
            height={300}
            alt="뱃지 사진이 이상해요"
          />
          <Name>씨앗</Name>
          <Exp>0 ~ 14xp</Exp>
        </Badge>
        <Badge>
          <Image
            src={"/analysis/badge/seed2.png"}
            layout="responsive"
            width={300}
            height={300}
            alt="뱃지 사진이 이상해요"
          />
          <Name>새싹</Name>
          <Exp>15 ~ 60xp</Exp>
        </Badge>
        <Badge>
          <Image
            src={"/analysis/badge/seed3.png"}
            layout="responsive"
            width={300}
            height={300}
            alt="뱃지 사진이 이상해요"
          />
          <Name>푸른잎</Name>
          <Exp>61 ~ 180xp</Exp>
        </Badge>
        <Badge>
          <Image
            src={"/analysis/badge/seed4.png"}
            layout="responsive"
            width={300}
            height={300}
            alt="뱃지 사진이 이상해요"
          />
          <Name>봉오리</Name>
          <Exp>181 ~ 360xp</Exp>
        </Badge>
        <Badge>
          <Image
            src={"/analysis/badge/seed5.png"}
            layout="responsive"
            width={300}
            height={300}
            alt="뱃지 사진이 이상해요"
          />
          <Name>개화</Name>
          <Exp>361xp ~</Exp>
        </Badge>
      </BadgeContainer>

      <Grade>
        <Title>성장 등급이란?</Title>
        <Sub>여러분의 알고리즘 풀이 습관을 형성하기 위해</Sub>
        <Sub>저희가 준비한 성장 등급 체계입니다.</Sub>
        <Sub>하루하루 꾸준히 문제를 풀어 씨앗에서 꽃을 피워 봅시다.</Sub>
      </Grade>

      <Point>
        <Title>성장 포인트 쌓기</Title>
        <Sub>로그인하면 기본 2p 추가</Sub>
        <Sub>만약, 연속으로 출석했다면 추가 1p 부여! (3p 추가)</Sub>
      </Point>
    </Container>
  )
}

export default BadgeModal