import styled from 'styled-components'
import { SubmittingAttr } from '../../../util/dto'

const Button = styled.button<{ cond: boolean }>`
  border: 2px solid #d4d4d4;
  border-radius: 10px;
  background: transparent;
  /* background-color: ${(props) => (props.cond ? "#FFC94D" : "#545454")}; //#FAFBED */
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.cond ? "#FFCF62" : "#efefef")};
  }
`

type SubmittingProps = {
  submittingAttr: SubmittingAttr,
  isImportant: boolean,
  onClick(event: any): void
}

export default function ButtonSubmittingOutlined({ submittingAttr, isImportant, onClick }: SubmittingProps) {
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
