import Image from 'next/image'
import GuideImg from '../../public/contents/signup.png'
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
  color: #545454;
`

export default function ProblemHelper() {
  return (
    <Grid.Container justify="flex-end" alignContent="center">
      <Grid key={"right"}>
        <Popover placement={"right"}>
          <Popover.Trigger>
            <Button flat color="warning" auto style={{
              fontSize: '1.2vw', borderRadius: '10px', width: '4.3vw', height: '2.6vw'
            }}>?</Button>
          </Popover.Trigger>

          <Popover.Content css={{ p: "$5" }}>
            <Canvas>
                <Image src={GuideImg} layout="fixed" width={500} height={200} alt= "guide image" />
            </Canvas>
            <Title>
              1. 백준 마이페이에 접속해 주세요.
            </Title>
            <Title>
              2. 맞은 문제는 <span style={{color: 'black', fontWeight: '700'}}>해결한 문제</span>에 붙여넣기 해주세요.
            </Title>
            <Title>
              3. 시도했지만 맞지 못한 문제는 <span style={{color: 'black', fontWeight: '700'}}>시도한 문제</span>에 붙여넣기 해주세요.
            </Title>
            <Title style={{marginTop: '20px'}}>
              더 많이 입력해 주실수록, <span style={{color: 'black', fontWeight: '700'}}>맞춤 알고리즘</span> 문제를 추천 받을 수 있습니다.
            </Title>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  )
}