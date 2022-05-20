import Link from 'next/link'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, pageState } from '../../../util/stateCollection'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Title = styled.span`
  margin-left: 40px;
  font-size: 1.8vw;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`

export default function BrandName() {
  const [page, setPage] = useRecoilState(pageState)
  const [isLogin, setIsLogin] = useState(true)
  const accessToken = useRecoilValue(accessTokenState)

  useEffect(() => {
    setIsLogin(accessToken !== '' ? true : false)
  }, [])

  return (
    <span>
      <Link href={isLogin ? "/recommendation" : "/random"}><Title onClick={() => setPage(isLogin ? '/recommendation' : '/random')}>알고풀자</Title></Link>
    </span>
  )
}