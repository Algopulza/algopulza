import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { pageState } from '../../../util/stateCollection'
import styled from 'styled-components'

const Title = styled.span`
  padding-left: 40px;
  font-size: 1.8vw;
  font-weight: 700;
  color: #FFFFFF;
`

export default function BrandName() {
  const [page, setPage] = useRecoilState(pageState)

  return (
    <span onClick={() => setPage('/recommendation')}>
      <Link href="/recommendation"><a><Title>알고풀자</Title></a></Link>
    </span>
  )
}
