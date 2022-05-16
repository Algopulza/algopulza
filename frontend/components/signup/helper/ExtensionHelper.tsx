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
      <Grid key={"right"}>
        <Popover placement={"right"}>
          <Popover.Trigger>
            <Button flat color="warning" auto style={{marginLeft: 10, fontSize: '1.2vw', borderRadius: '15px'}}>?</Button>
          </Popover.Trigger>

          <Popover.Content css={{ p: "$3", background: '#FAFBED' }}>
            <Canvas>
              <Image src={GuideImg} layout="fixed" width={400} height={200} alt= "guide image" />
            </Canvas>
            <Title>{`"알고풀자"만의 익스텐션을 설치하시면`}</Title>
            <Title>{`스탑워치를 활용한 문제 풀이 시간 측정과`}</Title>
            <Title>{`손쉬운 문제 풀이 정보 제공이 가능해집니다!`}</Title>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  )
}
