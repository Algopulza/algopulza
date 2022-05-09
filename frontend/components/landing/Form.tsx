import {useState} from 'react'
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
  const handleChange = (event: any) => {
    setBojId(event.target.value)
  }
  const handleClick = () => {
    axios({
      url: 'https://k6a408.p.ssafy.io/api/v1/members',
      method: 'post',
      headers: {
        'bojId': bojId
      }
    })
      .then(res => {
        console.log(res)
      })
  }

  return (
    <Container>
      <div style={{marginBottom: 40}}>
        <InputTextField
          textFieldAttr={{width: '20vw', id: 'bojId', label: 'BOJ ID', password: false, autofocus: true}}
          onChange={handleChange}
        />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: '검색', width: '20vw'}} onClick={handleClick} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
