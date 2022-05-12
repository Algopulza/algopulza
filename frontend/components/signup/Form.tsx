import { useState } from 'react'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import 'bootstrap/dist/css/bootstrap.css'
import { Input } from 'reactstrap'
import styled from 'styled-components'
import { axiosImg } from '../../util/axiosCollection'


const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export type TextFieldAttr = {
  id: string,
  label: string,
  width: string,
  password: boolean,
  autofocus: boolean
}

export type SubmittingAttr = { text: string, width: string }

export default function Form() {
  const [imgName, setImgName] = useState('')
  const [img, setImg] = useState({})

  const handleImgChange = (event: any) => {
    event.preventDefault()

    if (event.target.files) {
      const newImg = event.target.files[0]
      const newImgFormData = new FormData()
      newImgFormData.append('capturedImage', newImg)
      setImg(newImgFormData)
    }
  }
  const handleImgClick = () => {
    axiosImg(img)
      .then(res => {
        // console.log(res.data.data)
        setImgName(res.data.data)
      })
  }
  const handleChange = () => {
    // props 맞추기 위한 null 함수
  }
  const [valid, setValid] = useState(true)

  return (
    <Container>
      <div style={{marginBottom: 30}}>
        <div style={{marginBottom: 40}}>
          <Input type='file' accept="image/*" onChange={handleImgChange} style={{width: '20vw', marginBottom: '10px'}} />
          <p>{`인증된 백준 ID: ${imgName}`}</p>
          <ButtonSubmitting submittingAttr={{text: '인증', width: '20vw'}} onClick={handleImgClick} />
        </div>

        <InputTextField
          textFieldAttr={{id: 'id', label:'ID', width: '20vw', password: false, autofocus: true}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'password', label:'Password', width: '20vw', password: true, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <InputTextField
          textFieldAttr={
            {id: 'passwordConfirmation', label:'Password Confirmation', width: '20vw', password: true, autofocus: false}
          }
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
        <InputTextField
          textFieldAttr={{id: 'email', label:'Email', width: '20vw', password: false, autofocus: false}}
          valid={valid}
          validMessage='백준 아이디를 정확히 입력해 주세요.'
          onChange={handleChange}
          onKeyDown={handleChange}
        />
      </div>

      <div>
        <ButtonSubmitting submittingAttr={{text: '회원가입', width: '20vw'}} onClick={handleChange} />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
