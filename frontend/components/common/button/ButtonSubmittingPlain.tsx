import styled from 'styled-components'
import { SubmittingAttr } from '../../../util/dto'

const Button = styled.button<{ cond: boolean }>`
  border: none;
  border-radius: 15px;
  background-color: ${(props) => (props.cond ? "#FFC94D" : "#1A4568")};
  color: ${(props) => (props.cond ? "#000000" : "#FFFFFF")};
  font-weight: ${(props) => (props.cond ? 700 : 500)};
  cursor: pointer;
  &:hover {
    background-color: #FFC94D;
  }
`

type SubmittingProps = {
  submittingAttr: SubmittingAttr,
  isImportant: boolean,
  onClick(event: any): void
}

export default function ButtonSubmittingPlain({ submittingAttr, isImportant, onClick }: SubmittingProps) {
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
      {submittingAttr.text}
    </Button>
  )
}
