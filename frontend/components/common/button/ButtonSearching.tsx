import styled from "styled-components"

const Button = styled.button`
  border: none;
  border-radius: 50%;
  font-size: 1vw;
  font-weight: 700;
  padding: 0.8em;
  margin-left: 1em;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #282828;
    opacity: 0.5;
    transition: 0.25s ease-out;
  }
  &:not(:hover) {
    transition: 0.25s ease-out;
  }
`

type SubmittingProps = {
  submittingAttr: any;
  onClick(event: any): void;
  onKeyDown(event: any): void;
}

export default function ButtonSearching({ submittingAttr, onClick, onKeyDown }: SubmittingProps) {
  return (
    <Button
      style={{ width: `${submittingAttr.width}` }}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {submittingAttr.text}
    </Button>
  )
}