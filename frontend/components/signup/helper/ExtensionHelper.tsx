import Image from 'next/image'
import GuideImg from '../../../public/contents/extension.png'
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

export default function ExtensionHelper() {
  return (
    <Grid.Container justify="center" alignContent="center">
      <Grid key={"right-bottom"}>
        <Popover placement={"right-bottom"}>
          <Popover.Trigger>
            <Button flat color="warning" auto style={{marginLeft: 10, fontSize: '1.2vw', borderRadius: '15px'}}>?</Button>
          </Popover.Trigger>

          <Popover.Content css={{ p: "$5" }}>
            <Canvas>
              <Image src={GuideImg} layout="fixed" width={400} height={300} alt= "guide image" />
            </Canvas>
            <Title>
              <span style={{color: 'black', fontWeight: '700'}}>알고풀자 익스텐션</span>을 설치해 보세요!
            </Title>
            <Title>
              <span style={{color: 'black', fontWeight: '700'}}>스톱워치</span>로 문제 풀이 시간을 쉽게 측정할 수 있으며,
            </Title>
            <Title>
            <span style={{color: 'black', fontWeight: '700'}}>버튼 클릭 한번</span>으로 간단하게 문제 풀이 정보를 제공할 수 있습니다.
            </Title>
            <Title style={{marginTop: '20px'}}>
              더 많이 제공해 주실수록, <span style={{color: 'black', fontWeight: '700'}}>맞춤 분석</span>이 가능해집니다!
            </Title>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  )
}
