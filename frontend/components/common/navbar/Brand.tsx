import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../../util/stateCollection'
import styled from 'styled-components'

const Title = styled.span`
  padding-left: 40px;
  font-size: 1.8vw;
  font-weight: 700;
`

export default function BrandName() {
  useEffect(() => {
    setIsLogin(localStorage.getItem('recoil-persist') !== null ? true : false )
  }, [])
  const [isLogin, setIsLogin] = useState(true)
  const [page, setPage] = useRecoilState(pageState)

  return (
    <>
      {
        isLogin ?
        <span onClick={() => setPage('/recommendation')}>
          <Link href="/recommendation"><a><Title>알고풀자</Title></a></Link>
        </span> :
        <span onClick={() => setPage('/random')}>
          <Link href="/random"><a><Title>알고풀자</Title></a></Link>
        </span>
      }
    </>
  )
}
