import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import GiftButton from './GiftButton'
import Card from '../../common/Card'
import styled from 'styled-components'


const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 35vh;
`

const Canvas = styled.div`
  margin-bottom: 20px;
  width: 13vw;
  cursor: pointer;
`

type TextProps = {
  text: string,
  img: StaticImageData,
  data: any,
  random: any,
}

export default function GiftBox({ text, img, data, random }: TextProps) {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <Container>
      {isToggled ?
        <Card
        key={data.problemId}
        tags={data.tagList}
        id={data.problemId}
        title={data.title}
        level={data.tierLevel}
        average={data.averageTryCount}
        accept={data.acceptedCount}
        /> :
        <Canvas onClick={() => setIsToggled(true)}>
          <Image src={img} layout="responsive" alt="gift box image" />
        </Canvas>
      }
      
      <GiftButton onClick={() => {random(), setIsToggled(!isToggled)}}>{text}</GiftButton>
    </Container>
  )
}
