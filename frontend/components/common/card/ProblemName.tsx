import Image from 'next/image'
import bookmarkYellow from '../../../public/common/bookmark_yellow.png'
import bookmarkFilled from '../../../public/common/bookmark_filled.png'
import { getBackgroundColor } from '../../../util/backgroundColor'
import styled from 'styled-components'

const Container = styled.section`
  height: 140px;
  padding: 10px;
  border-radius: 15px 15px 0 0;
`

const Canvas = styled.div`
  width: 1.3vw;
  height: 20px;
`

const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin: 0;
  font-size: 1.2vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`

type HeaderProps = {
  title: string,
  id: number,
  tier: string
}

export default function ProblemName({ title, id, tier }: HeaderProps) {
  const isBookmarked = true
  const backgroundColor = getBackgroundColor(tier)
  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net/problem/${id}`
    window.open(problemUrl)
  }

  return (
    <Container style={{background: backgroundColor}}>
      <Canvas>
        {isBookmarked ?
          <Image src={bookmarkYellow} layout="responsive" alt="bookmark outlined image"/> :
          <Image src={bookmarkFilled} layout="responsive" alt="bookmark filled image"/>
        }
      </Canvas>

      <Title onClick={handleClick}>
        {title}
      </Title>
    </Container>
  )
}
