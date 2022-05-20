import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import GiftButton from "./GiftButton"
import Card from "../../common/card/Card"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { accessTokenState } from "../../../util/stateCollection"
import { showToastError } from "../../common/alert/Alert"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
`

const Canvas = styled.div`
  margin-bottom: 25px;
  width: 13vw;
  cursor: pointer;
`

type TextProps = {
  text: string
  img: StaticImageData
  data: any
  random: any
};

export default function GiftBox({ text, img, data, random }: TextProps) {
  const accessToken = useRecoilValue(accessTokenState);
  const [isToggled, setIsToggled] = useState(false);
  return (
    <Container>
      {isToggled ? (
        <Card
          key={data.bojId}
          id={data.bojId}
          problemId={data.problemId}
          title={data.title}
          tier={data.tierName}
          level={data.tierLevel}
          accept={data.acceptedCount}
          bookmark={data.markFlag}
        />
      ) : (
        <Canvas onClick={accessToken === '' && text.includes('고려') ? () => showToastError('회원 가입한 유저만 사용 가능합니다.') : () => setIsToggled(true)}>
          <Image src={img} layout="responsive" alt="gift box image" />
        </Canvas>
      )}

      <GiftButton
        onClick={() => {
          isToggled && random(), setIsToggled(!isToggled);
        }}
      >
        {text}
      </GiftButton>
    </Container>
  );
}