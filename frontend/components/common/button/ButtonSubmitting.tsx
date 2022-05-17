import styled from 'styled-components'
import { SubmittingAttr } from '../../../util/dto'

const Button = styled.button<{ cond: boolean }>`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.cond ? "#FFC94D" : "#545454")}; //#FAFBED
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.cond ? "#FFCF62" : "#5C5C5C")};
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
