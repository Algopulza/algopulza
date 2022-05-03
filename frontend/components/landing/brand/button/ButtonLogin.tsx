import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'

const Button = styled.button`
  display: block;
  margin-bottom: 20px;

  width: 13vw;
  height: 70px;
  background: #FFC94D;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-size: 1.5vw;
  font-weight: 700;
  color: white;
  
  cursor: pointer;
  &:hover {
    background-color: #DCA03A;
  }
`

export default function ButtonLogin() {
  const router = useRouter()
  function moveToRecommendation() {
    window.open("https://solved.ac/login?prev=%2F")
    // window.open('https://www.acmicpc.net/login?next=%2Fsso%3Fsso%3Dbm9uY2U9MTlkNTQ5MTExMGIyOTM1NGZhOGJkNzdmNTEwZDliOGQ%253D%26sig%3D880f15b9c24501458deea0660bb17aa1d02a9a2146fc9ca011f699fe6938cda3%26redirect%3Dhttps%253A%252F%252Fsolved.ac%252Fapi%252Fv3%252Fauth%252Fsso%253Fprev%253D%25252F')
    // window.open('https://www.acmicpc.net/sso?sso=bm9uY2U9MTlkNTQ5MTExMGIyOTM1NGZhOGJkNzdmNTEwZDliOGQ=&sig=880f15b9c24501458deea0660bb17aa1d02a9a2146fc9ca011f699fe6938cda3&redirect=https:/solved.ac/api/v3/auth/sso?prev=%2F')

    // window.open('https://www.acmicpc.net/sso?sso=bm9uY2U9NTdkODZlOTIxODk1NWIxZTg3ODI2YjZkNzM1ODYxNzQ%3D&sig=3b5012b69e6c1f890e7d36387e4428835b548d3e3d0167a9b43623a13c36aaf1&redirect=https%3A%2F%2Fsolved.ac%2Fapi%2Fv3%2Fauth%2Fsso%3Fprev%3D%252F')
    const myToken = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJjb3RpZzciLCJpYXQiOjE2NTE1NTEwNzN9.R0yoiX86EBBHSGWjhhH-23RqllaemrcCJTUcJIfct7o.WPaQjAejxeAxetD8VlZsVo2VtShqMTMl%2BkLm4dR8u7o'
    router.push('/recommendation')
  }

  return (
    <Button onClick={moveToRecommendation}>로그인</Button>
  )
}
