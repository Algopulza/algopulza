import styled from "styled-components"
import { SubmittingAttr } from "../../../../util/dto"
import PauseIcon from "@mui/icons-material/Pause"

const Button = styled.button<{ cond: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.cond ? "#FFC94D" : "#545454")};
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.cond ? "#FFCF62" : "#5C5C5C")};
  }
`

type SubmittingProps = {
  submittingAttr: SubmittingAttr
  isImportant: boolean
  onClick(event: any): void
}

export default function ImgButtonPause({ submittingAttr, isImportant, onClick }: SubmittingProps) {
  return (
    <Button
      style={{
        width: submittingAttr.width,
        height: submittingAttr.height,
        marginBottom: submittingAttr.marBot,
        fontSize: submittingAttr.fontSize
      }}
      cond={isImportant}
      onClick={onClick}
    >
      <PauseIcon />
    </Button>
  )
}