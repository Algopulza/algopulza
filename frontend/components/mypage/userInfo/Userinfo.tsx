import styled from "styled-components"
import Image from "next/image"
import { getBadgeImage } from "../../../util/BadgeImage"
import AnalyCard from "../../common/card/AnalyCard"

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: flex-end;
  border-radius: 4rem;
  width: 4rem;
  height: 3rem;
`

const EXP = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: bold;
  margin-left: 0.1rem;
  font-size: 0.8rem;
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
  color: #0864B9;
  margin-left:5px;
`

type User = {
  algopluzaId: string
  tierLevel: number
  tierName: string
  time: number
  exp: number
}

export default function Userinfo({algopluzaId, time, exp}: User) {
  const badge = getBadgeImage(exp).image

  return (
    <AnalyCard>
      <TopContainer>
        <ProfileImage>
          <Image src={badge} layout="responsive" width={500} height={500} alt="뱃지 사진이 이상해요" />
          <EXP>{exp}xp</EXP>
        </ProfileImage>
        <NickName>{algopluzaId}</NickName>
      </TopContainer>

      <BottomContainer>
        알고리즘을 총 <Text>{time}분</Text> 동안 풀었어요!
      </BottomContainer>
    </AnalyCard>
  )
}
