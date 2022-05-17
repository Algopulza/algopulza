import React, { useState } from 'react';
import Image from 'next/image'
import bookmarkYellow from '../../../../public/common/bookmark_yellow.png'
import bookmarkEmpty from '../../../../public/common/bookmark_empty.png'
import styled from 'styled-components';
import { getBackgroundColor } from '../../../../util/backgroundColor';

import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../../util/stateCollection'
import { axiosDeleteBookmark, axiosPutBookmark } from '../../../../util/axiosCollection';

const Container = styled.div`
  width: 15vw;
  background: #ffffff;
  box-shadow: 3px 5px 12px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 1rem;
  margin-bottom:1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProblemBojId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c4c4c4;
  font-size: 0.8rem;
`;

const Canvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.3vw;
  height: 20px;
  cursor: pointer;
`

const Tier = styled.div<{bg : string}>`
  border-radius: 10px;
  height: 2rem;
  width: 2rem;
  color: white;
  background-color: ${(props) => (props.bg ? props.bg : "")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProblemTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  margin-left: 0.5rem;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const FavoriteCard = (props: any) => {
  const backgroundColor = getBackgroundColor(props.tierName)
  const accessToken = useRecoilValue(accessTokenState)
  const [isBookmark, setIsBookmark] = useState(true)

  const handleClick = () => {
    const problemUrl = `https://www.acmicpc.net/problem/${props.bojId}`
    window.open(problemUrl)
  }

  const handleBookmarkPutClick = () => {
    axiosPutBookmark(props.id, accessToken)
      .then(res => {
        setIsBookmark(true)
      })
  }

  const handleBookmarkDeleteClick = () => {
    axiosDeleteBookmark(props.id, accessToken)
      .then(res => {
        setIsBookmark(false)
      })
  }

  return (
    <Container>
      <HeaderContainer>
        <ProblemBojId>#{props.bojId}</ProblemBojId>
        <Canvas>
          {isBookmark ?
            <Image
              onClick={() => {handleBookmarkDeleteClick()}}
              src={bookmarkYellow}
              alt="bookmark yellow image" /> :
            <Image
              onClick={() => {handleBookmarkPutClick()}}
              src={bookmarkEmpty}
              alt="bookmark filled image"
            />
          }
        </Canvas>
      </HeaderContainer>
      <SubContainer>
        <Tier bg={backgroundColor}>{props.tierLevel}</Tier>
        <ProblemTitle onClick={handleClick}>
          {props.title}
        </ProblemTitle>
      </SubContainer>
    </Container>
  );
};

export default FavoriteCard;