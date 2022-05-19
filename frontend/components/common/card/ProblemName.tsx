import Image from 'next/image'
import bookmarkYellow from '../../../public/common/bookmark_yellow.png'
import bookmarkEmpty from '../../../public/common/bookmark_empty.png'
import { getBackgroundColor } from '../../../util/backgroundColor'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'
import { axiosPutBookmark, axiosDeleteBookmark } from '../../../util/axiosCollection'
import { useState } from 'react'
import { showToastError } from '../alert/Alert'

const Container = styled.section`
  height: 14vh;
  padding: 1vh;
  border-radius: 10px 10px 0 0;
`

const Canvas = styled.div`
  width: 1.3vw;
  height: 2vh;
  cursor: pointer;
`

const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin: 0;
  font-size: 1.2vw;
  cursor: pointer;
`

const Core = styled.span`
  color: #FFFFFF;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

type HeaderProps = {
  title: string,
  id: number,
  problemId: number,
  tier: string,
  bookmark: boolean
}

export default function ProblemName({ title, id, problemId, tier, bookmark }: HeaderProps) {
  const backgroundColor = getBackgroundColor(tier)
  const accessToken = useRecoilValue(accessTokenState)
  const [isBookmark, setIsBookmark] = useState(bookmark)

  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net/problem/${id}`
    window.open(problemUrl)
  }

  const handleBookmarkPutClick = () => {
    axiosPutBookmark(problemId, accessToken)
      .then(res => {
        setIsBookmark(true)
      })
      .catch(err => {
        showToastError('회원 가입한 유저만 사용 가능합니다.')
      })
  }

  const handleBookmarkDeleteClick = () => {
    axiosDeleteBookmark(problemId, accessToken)
      .then(res => {
        // console.log(res)
        setIsBookmark(false)
      })
      .catch(err => {
        showToastError('회원 가입한 유저만 사용 가능합니다.')
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
            src={bookmarkEmpty}
            layout="responsive"
            alt="bookmark filled image"
          />
        }
      </Canvas>

      <Title onClick={handleClick}>
        <Core>{title}</Core>
      </Title>
    </Container>
  )
}
