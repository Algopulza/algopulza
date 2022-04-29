import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import GiftButton from './GiftButton'
import Card from '../../common/Card'
import styled from 'styled-components'


const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
`

const Canvas = styled.div`
  width: 13vw;
  cursor: pointer;
`

type TextProps = {
  text: string,
  img: StaticImageData
}

export default function GiftBox({ text, img }: TextProps) {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <Container>
      {isToggled ? <Card /> : <Canvas onClick={() => setIsToggled(!isToggled)}><Image src={img} layout="responsive" alt="gift box image" /></Canvas>}
      
      <GiftButton onClick={() => setIsToggled(!isToggled)}>{text}</GiftButton>
    </Container>
  )
}
