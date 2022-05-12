import Image from 'next/image'
import bookmarkYellow from '../../../public/common/bookmark_yellow.png'
import bookmarkFilled from '../../../public/common/bookmark_filled.png'
import { getBackgroundColor } from '../../../util/backgroundColor'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'
import { axiosPutBookmark, axiosDeleteBookmark } from '../../../util/axiosCollection'
import { useState } from 'react'

const Container = styled.section`
  height: 140px;
  padding: 10px;
  border-radius: 15px 15px 0 0;
`

const Canvas = styled.div`
  width: 1.3vw;
  height: 20px;
  cursor: pointer;
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
  tier: string,
  bookmark: boolean
}

export default function ProblemName({ title, id, tier, bookmark }: HeaderProps) {
  const backgroundColor = getBackgroundColor(tier)
  const accessToken = useRecoilValue(accessTokenState)
  const [isBookmark, setIsBookmark] = useState(bookmark)
  // const [isBookmark, setIsBookmark] = useState(bookmark)
  // setIsBookmark(bookmark)

  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net/problem/${id}`
    window.open(problemUrl)
  }

  const handleBookmarkPutClick = () => {
    axiosPutBookmark(id, accessToken)
      .then(res => {
        console.log(res)
        setIsBookmark(true)
      })
  }

  const handleBookmarkDeleteClick = () => {
    axiosDeleteBookmark(id, accessToken)
      .then(res => {
        console.log(res)
        setIsBookmark(false)
      })
  }

  return (
    <Container style={{background: backgroundColor}}>
      <Canvas>
        {isBookmark ?
          <Image
            onClick={() => {handleBookmarkDeleteClick()}}
            src={bookmarkYellow}
            layout="responsive"
            alt="bookmark yellow image" /> :
          <Image
            onClick={() => {handleBookmarkPutClick()}}
            src={bookmarkFilled}
            layout="responsive"
            alt="bookmark filled image"
          />
        }
      </Canvas>

      <Title onClick={handleClick}>
        {title}
      </Title>
    </Container>
  )
}
