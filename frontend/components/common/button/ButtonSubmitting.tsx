import styled from 'styled-components'
import { SubmittingAttr } from '../../../util/dto'

const Button = styled.button<{ cond: boolean }>`
  height: 45px;
  border: none;
  border-radius: 15px;
  /* box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25); */
  background-color: ${(props) => (props.cond ? "#FFC94D" : "#1A4568")};
  color: #FFFFFF;
  font-weight: ${(props) => (props.cond ? 700 : 500)};
  cursor: pointer;
  /* &:hover {
    background-color: #1A4568;
  } */
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
