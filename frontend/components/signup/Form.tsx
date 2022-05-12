import { useState } from 'react'
import InputTextField from '../common/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import 'bootstrap/dist/css/bootstrap.css'
import { Input } from 'reactstrap'
import styled from 'styled-components'
import { axiosImg } from '../../util/axiosCollection'
import { axiosId } from '../../util/axiosCollection'
import { handleSignupClick } from '../../util/inputHandlerCollection'

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
  const [isSame, setIsSame] = useState(false)
  const [password, setPassword] = useState('')
  const [pwConfrim, setPwConfirm] = useState('')
  const [sovled, setSolved] = useState('')
  const [tried, setTried] = useState('')

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
  const handleImgClick = () => {
    axiosImg(img)
      .then(res => {
        // console.log(res.data.data)
        setImgName(res.data.data)
      })
  }
  const handleIdChange = (event: any) => {
    setId(event.target.value)
  }

  const handleIdClick = (event: any, id: string) => {
    if (id.trim() === '') {
      console.log('not valid')
    } else {
      axiosId(id)
        .then(res => {
          console.log(res.data.data)
          setIsSame(res.data.data)
        })
    }
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

  return (
    <Container>
      <div style={{marginBottom: 30}}>
        <div style={{marginBottom: 40}}>
          <Input type='file' accept="image/*" onChange={handleImgChange} style={{width: '20vw', marginBottom: '10px'}} />
          {imgName ? <p style={{fontSize: '1.1vw'}}>{`인증된 백준 ID: ${imgName}`}</p> : <></>}
          <ButtonSubmitting submittingAttr={{text: '인증', width: '20vw'}} onClick={handleImgClick} />
        </div>

        <div style={{marginBottom: 40}}>
          <InputTextField
            textFieldAttr={{id: 'id', label:'ID', width: '20vw', password: false, autofocus: true}}
            valid={true}
            validMessage='아이디를 정확히 입력해 주세요.'
            onChange={handleIdChange}
            onKeyDown={() => {}}
          />
          {isSame ? <p style={{fontSize: '1.1vw'}}>{`중복입니다.`}</p> : <></>}
          <ButtonSubmitting submittingAttr={{text: '중복 검사', width: '20vw'}} onClick={() => {handleIdClick(event, id)}} />
        </div>

        <InputTextField
          textFieldAttr={{id: 'password', label:'Password', width: '20vw', password: true, autofocus: false}}
          valid={true}
          validMessage='비밀번호를 정확히 입력해 주세요.'
          onChange={handlePasswordChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={
            {id: 'passwordConfirmation', label:'Password Confirmation', width: '20vw', password: true, autofocus: false}
          }
          valid={true}
          validMessage='비빌번호를 정확히 입력해 주세요.'
          onChange={handlePwConfirmChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{id: 'solved', label:'Solved Problems', width: '20vw', password: false, autofocus: false}}
          valid={true}
          validMessage='풀이한 문제를 정확히 입력해 주세요.'
          onChange={handleSolvedChange}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{id: 'tried', label:'Tried Problems', width: '20vw', password: false, autofocus: false}}
          valid={true}
          validMessage='시도한 문제를 정확히 입력해 주세요.'
          onChange={handleTriedChange}
          onKeyDown={() => {}}
        />
      </div>

      <div>
        <ButtonSubmitting
          submittingAttr={{text: '회원가입', width: '20vw'}}
          onClick={() => {handleSignupClick(event, pureImg, id, password, pwConfrim, sovled, tried)}}
        />
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
