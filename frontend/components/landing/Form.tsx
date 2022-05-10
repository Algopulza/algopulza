import {useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Form() {
  const [bojId, setBojId] = useState('')
  const [valid, setValid] = useState(true)
  const handleChange = (event: any) => {
    setBojId(event.target.value)
  }
  const router = useRouter()
  const handleClick = (event: any) => {
    if (bojId.trim() == '') {
      setValid(false)
    } else {
      setValid(true)
      axios({
        url: 'https://k6a408.p.ssafy.io/api/v1/members',
        method: 'post',
        headers: {
          'bojId': bojId
        }
      })
        .then(res => {
          console.log(res.data.data)
          localStorage.setItem('userInfo', JSON.stringify(res.data.data.member))
          localStorage.setItem('accessToken', res.data.data.token.accessToken)
          localStorage.setItem('refreshToken', res.data.data.token.refreshToken)
          router.push('/recommendation')
        })
    }
  }

  return (
    <Container>
      <div style={{marginBottom: 40}}>
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'bojId', label: 'BOJ ID', password: false, autofocus: true}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
        />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: '로그인', width: '20vw'}} onClick={handleClick} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
