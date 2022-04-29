import Image, { StaticImageData } from 'next/image'
import GiftButton from './GiftButton'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
`

const Canvas = styled.div`
  width: 15vw;
`

type TextProps = {
  text: string,
  img: StaticImageData
}

export default function GiftBox({ text, img }: TextProps) {
  return (
    <Container>
      <Canvas>
        <Image src={img} layout="responsive" alt="gift box image" />
      </Canvas>

      <GiftButton>{text}</GiftButton>
    </Container>
  )
}
