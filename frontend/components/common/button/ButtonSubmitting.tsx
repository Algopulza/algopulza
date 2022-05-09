import styled from 'styled-components'
import { SubmittingAttr } from '../../landing/Form'

const Button = styled.button`
  height: 45px;
  background: #FFC94D;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
  font-size: 1.3vw;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #1A4568;
  }
`

type SubmittingProps = {
  submittingAttr: SubmittingAttr,
  onClick(): void
}

export default function ButtonSubmitting({ submittingAttr, onClick }: SubmittingProps) {
  return (
    <Button style={{width: `${submittingAttr.width}`}} onClick={onClick}>{submittingAttr.text}</Button>
  )
}
