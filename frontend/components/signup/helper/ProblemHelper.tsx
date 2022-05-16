import Image from 'next/image'
import GuideImg from '../../../public/contents/signup.png'
import styled from 'styled-components'
import { Popover, Button, Grid } from "@nextui-org/react"

const Canvas = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.p`
  margin: 10px 0;
  padding: 0;
  font-size: 1vw;
`

export default function ProblemHelper() {
  return (
    <Grid.Container justify="center" alignContent="center">
      <Grid key={"right"}>
        <Popover placement={"right"}>
          <Popover.Trigger>
            <Button flat color="warning" auto style={{marginLeft: 10, fontSize: '1.2vw', borderRadius: '15px'}}>?</Button>
          </Popover.Trigger>

          <Popover.Content css={{ p: "$5", background: '#FAFBED' }}>
          <Canvas>
              <Image src={GuideImg} layout="fixed" width={500} height={150} alt= "guide image" />
            </Canvas>
            <Title>{`1. 먼저, 백준 마이페이에 접속해 주세요.`}</Title>
            <Title>{`2. '맞은' 문제는 "해결한 문제"에!`}</Title>
            <Title>{`3. '시도했지만 맞지 못한 문제'는 "시도한 문제"에 넣어주세요!`}</Title>
            <Title style={{marginTop: '20px'}}>
              {`더 많이 입력해 주실수록, 맞춤 알고리즘 문제를 추천 받을 수 있답니다!!`}
            </Title>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  )
}