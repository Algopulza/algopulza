import styled from 'styled-components'

const Button = styled.button`
  height: 45px;
  background: #FFC94D;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  font-size: 1.3vw;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #1A4568;
  }
`

type SubmittingProps = {
  submittingAttr: any,
  onClick(event: any): void,
  onKeyDown(event: any): void,
}

export default function ButtonSearching({ submittingAttr, onClick, onKeyDown }: SubmittingProps) {
  return (
    <Button style={{width: `${submittingAttr.width}`}} onClick={onClick} onKeyDown={onKeyDown}>
      {submittingAttr.text}
    </Button>
  )
}
