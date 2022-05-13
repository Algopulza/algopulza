import { useState } from 'react'
import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import { Input } from 'reactstrap'
import { axiosImg } from '../../util/axiosCollection'
import { axiosId } from '../../util/axiosCollection'
import { handleSignupClick } from '../../util/inputHandlerCollection'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Form() {
  const [img, setImg] = useState({})
  const [pureImg, setPureImg] = useState('')
  const [imgName, setImgName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [pwConfrim, setPwConfirm] = useState('')
  const [sovled, setSolved] = useState('')
  const [tried, setTried] = useState('')
  const router = useRouter()

  const handleImgChange = (event: any) => {
    event.preventDefault()

    if (event.target.files) {
      const newImg = event.target.files[0]
      setPureImg(newImg)
      const newImgFormData = new FormData()
      newImgFormData.append('capturedImage', newImg)
      setImg(newImgFormData)
    }
  }
  const handleIdChange = (event: any) => {
    setId(event.target.value)
  }
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }
  const handlePwConfirmChange = (event: any) => {
    setPwConfirm(event.target.value)
  }
  const handleSolvedChange = (event: any) => {
    setSolved(event.target.value)
  }
  const handleTriedChange = (event: any) => {
    setTried(event.target.value)
  }
  
  const handleImgClick = () => {
    axiosImg(img)
      .then(res => {
        // console.log(res.data.data)
        setImgName(res.data.data)
      })
  }
  const handleIdClick = (event: any, id: string) => {
    if (id.trim() === '') {
      console.log('not valid')
    } else {
      console.log(`전송id: ${id}`)
      axiosId(id)
        .then(res => {
          console.log(res)
          const idResult = document.getElementById('idResult')
          const text = res.data.data ? '중복입니다.' : '가능합니다.'
          idResult!.innerText = text
        })
    }
  }

  return (
    <Container>
      <div style={{marginBottom: 20, textAlign: 'center'}}>
        <Input type='file' accept="image/*" onChange={handleImgChange} style={{width: '25vw', marginBottom: 10}} />
        <ButtonSubmitting submittingAttr={{text: '인증', width: '25vw', fontSize: '1.1vw'}} onClick={handleImgClick} />
        {imgName ? <p style={{fontSize: '1vw', marginTop: 10, marginBottom: 0}}>{`인증된 백준 ID: ${imgName}`}</p> : <></>}
      </div>

      <div style={{marginBottom: 20, textAlign: 'center'}}>
        <InputTextField
          textFieldAttr={{id: 'id', label:'ID', width: '25vw', marginRight: '0px', password: false, autofocus: true}}
          valid={true}
          validMessage='아이디를 정확히 입력해 주세요.'
          onChange={handleIdChange}
          onKeyDown={() => {}}
        />
        <ButtonSubmitting
          submittingAttr={{text: '중복 검사', width: '25vw', fontSize: '1.1vw'}} onClick={() => {handleIdClick(event, id)}}
        />
        <p id="idResult" style={{fontSize: '1vw', marginTop: 10, marginBottom: 0}}></p>
      </div>

      <div>
        <InputTextField
          textFieldAttr={{id: 'password', label:'Password', marginRight: '0px', width: '25vw', password: true, autofocus: false}}
          valid={true}
          validMessage='비밀번호를 정확히 입력해 주세요.'
          onChange={handlePasswordChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={
            {id: 'passwordConfirmation', label:'Password Confirmation', marginRight: '0px', width: '25vw', password: true, autofocus: false}
          }
          valid={true}
          validMessage='비빌번호를 정확히 입력해 주세요.'
          onChange={handlePwConfirmChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{id: 'solved', label:'Solved Problems', width: '25vw', marginRight: '0px', password: false, autofocus: false}}
          valid={true}
          validMessage='풀이한 문제를 정확히 입력해 주세요.'
          onChange={handleSolvedChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{id: 'tried', label:'Tried Problems', width: '25vw', marginRight: '0px', password: false, autofocus: false}}
          valid={true}
          validMessage='시도한 문제를 정확히 입력해 주세요.'
          onChange={handleTriedChange}
          onKeyDown={() => {}}
        />
        <div>
          <ButtonSubmitting
            submittingAttr={{text: '회원가입', width: '25vw', fontSize: '1.1vw'}}
            onClick={() => {handleSignupClick(event, pureImg, id, password, pwConfrim, sovled, tried, router)}}
          />
        </div>
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
