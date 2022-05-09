import { useRouter } from 'next/router'
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
  submittingAttr: SubmittingAttr
}

export default function ButtonSubmitting({ submittingAttr }: SubmittingProps) {
  const router = useRouter()
  function moveToRecommendation() {
    router.push('/recommendation')
  }

  return (
    <Button style={{width: `${submittingAttr.width}`}} onClick={moveToRecommendation}>{submittingAttr.text}</Button>
  )
}
