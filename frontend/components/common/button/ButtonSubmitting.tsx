import styled from 'styled-components'
import { SubmittingAttr } from '../../../util/dto'

const Button = styled.button<{ cond: boolean }>`
  height: 45px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.cond ? "#FFC94D" : "white")}; //#FAFBED
  color: ${(props) => (props.cond ? "#FFFFFF" : "#838383")};
  font-weight: ${(props) => (props.cond ? 700 : 700)};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.cond ? "#EA9800" : "#dfdddd")};
    color: ${(props) => (props.cond ? "#FFFFFF" : "#939292")};
  }
`

type SubmittingProps = {
  submittingAttr: SubmittingAttr,
  isImportant: boolean,
  onClick(event: any): void
}

export default function ButtonSubmitting({ submittingAttr, isImportant, onClick }: SubmittingProps) {
  return (
    <Button
      style={{
        width: submittingAttr.width,
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
