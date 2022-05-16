import { useState } from 'react'
import { useRouter } from 'next/router'
import InputTextField from '../common/input/InputTextField'
import ButtonSubmitting from '../common/button/ButtonSubmitting'
import ButtonRedirecting from '../common/button/ButtonRedirecting'
import styled from 'styled-components'
import { Input } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { axiosImg, axiosId } from '../../util/axiosCollection'
import { handleSignupClick } from '../../util/inputHandlerCollection'
import { useRecoilState } from 'recoil'
import { idState, passwordState, pwConfirmState, solvedState, triedState } from '../../util/stateCollection'
import { checkId, checkPassword, checkSpace } from '../../util/validationCollection'

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
  const [id, setId] = useRecoilState(idState)
  const [password, setPassword] = useRecoilState(passwordState)
  const [pwConfirm, setPwConfirm] = useRecoilState(pwConfirmState)
  const [solved, setSolved] = useRecoilState(solvedState)
  const [tried, setTried] = useRecoilState(triedState)
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
  const handleImgClick = () => {
    axiosImg(img)
      .then(res => {
        setImgName(res.data.data)
      })
      .catch(error => {
        setImgName('인증 불가')
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
        <ButtonSubmitting
          submittingAttr={{text: '인증', width: '25vw', marBot: '0px', fontSize: '1vw'}}
          isImportant={false}
          onClick={handleImgClick}
        />
        {imgName ? <p style={{fontSize: '1vw', marginTop: 10, marginBottom: 0}}>{`인증된 백준 ID: ${imgName}`}</p> : <></>}
      </div>

      <div style={{marginBottom: 20, textAlign: 'center'}}>
        <InputTextField
          textFieldAttr={{width: '25vw', id: 'id', label: 'ID', marBot: '15px', marRig: '0px', isPw: false, isAf: true}}
          valid={checkId}
          errorMessage='2 글자 이상의 영문 소문자이어야 합니다.'
          setter={setId}
          onKeyDown={() => {}}
        />
        <ButtonSubmitting
          submittingAttr={{text: '중복 확인', width: '25vw', marBot: '0px', fontSize: '1vw'}}
          isImportant={false}
          onClick={() => {handleIdClick(event, id)}}
        />
        <p id="idResult" style={{fontSize: '1vw', marginTop: 10, marginBottom: 0}}></p>
      </div>

      <div>
        <InputTextField
          textFieldAttr={{width: '25vw', id: 'password', label: 'Password', marBot: '15px', marRig: '0px', isPw: true, isAf: false}}
          valid={checkPassword}
          errorMessage='8~14 글자의 영문 대소문자 및 특수문자이어야 합니다.'
          setter={setPassword}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '25vw', id: 'pwConfirm', label: 'Password Check', marBot: '15px', marRig: '0px', isPw: true, isAf: false}}
          valid={checkSpace}
          errorMessage='비밀번호를 한번 더 입력해주세요.'
          setter={setPwConfirm}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '25vw', id: 'solved', label: 'Solved Problems', marBot: '15px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='해결한 문제들을 입력해주세요.'
          setter={setSolved}
          onKeyDown={() => {}}
        />
        <InputTextField
          textFieldAttr={{width: '25vw', id: 'tried', label: 'Tried Problems', marBot: '15px', marRig: '0px', isPw: false, isAf: false}}
          valid={checkSpace}
          errorMessage='시도한 문제들을 입력해주세요'
          setter={setTried}
          onKeyDown={() => {}}
        />
        <div>
        <ButtonSubmitting
          submittingAttr={{text: '회원 가입', width: '25vw', marBot: '15px', fontSize: '1.1vw'}}
          isImportant={true}
          onClick={() => {handleSignupClick(event, pureImg, id, password, pwConfirm, solved, tried, router)}}
        />
        </div>
        <ButtonRedirecting />
      </div>
    </Container>
  )
}
