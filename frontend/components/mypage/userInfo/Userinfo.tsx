import styled from "styled-components"
import AnalyCard from "../../common/card/AnalyCard"
import BadgeImage from "./BadgeImage"

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 1rem;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

const Text = styled.span`
  font-weight: bold;
  color: #0864b9;
  margin-left: 5px;
`

type User = {
  algopluzaId: string
  tierLevel: number
  tierName: string
  time: number
  exp: number
};

export default function Userinfo({ algopluzaId, time, exp }: User) {
  return (
    <AnalyCard>
      <TopContainer>
        <BadgeImage exp={exp} />
        <NickName>{algopluzaId}</NickName>
      </TopContainer>

      <BottomContainer>
        알고리즘을 총 <Text>{time}분</Text> 동안 풀었어요!
      </BottomContainer>
    </AnalyCard>
  )
}