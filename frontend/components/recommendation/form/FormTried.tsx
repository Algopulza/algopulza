import InputTextArea from "../../common/input/InputTextArea"
import styled from "styled-components"
import { axiosTried } from "../../../util/axiosCollection"
import { useRecoilState, useRecoilValue } from "recoil"
import { accessTokenState, bojIdState, triedState } from "../../../util/stateCollection"
import { checkSpace } from "../../../util/validationCollection"
import { showToast } from "../../common/alert/Alert"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const AreaTitle = styled.span`
  font-size: 1.3em;
  font-weight: bold;
  color: #e45624;
  padding-bottom: 0.3em;
`

const SubmitButton = styled.button`
  background-color: #545454;
  color: #ffffff;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.3em 1.5em;
  border: none;
  border-radius: 0.3em;
  cursor: pointer;
  &:hover {
    transition: 0.25s ease-out;
    opacity: 0.7;
  }
  &:not(:hover) {
    transition: 0.25s ease-out;
  }
`

export default function FormTried() {
  const [tried, setTried] = useRecoilState(triedState)
  const bojId = useRecoilValue(bojIdState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleClick = (event: any) => {
    axiosTried(bojId, tried, accessToken).then((res) => {
      showToast("제출해주셔서 감사합니다.")
    })
  }

  return (
    <Container>
      <AreaTitle>tried</AreaTitle>
      <InputTextArea
        textFieldAttr={{
          width: "20vw",
          id: "tried",
          label: "맞히지 못한 문제",
          marBot: "10px",
          marRig: "0px",
          isPw: false,
          isAf: false,
        }}
        valid={checkSpace}
        errorMessage="시도한 문제들을 입력해주세요"
        setter={setTried}
        onKeyDown={() => {}}
      />
      <p
        id="resultTried"
        style={{ fontSize: "0.8vw", marginTop: 0, marginBottom: 0 }}
      ></p>
      <SubmitButton onClick={handleClick}>제출</SubmitButton>
    </Container>
  );
}