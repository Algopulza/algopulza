import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { TextFieldAttr } from '../../../util/dto'
import { submitState } from '../../../util/stateCollection'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  valid(item: string): boolean
  errorMessage: string
  setter: any
  onKeyDown(event: any): void
}

export default function InputTextField({ textFieldAttr, valid, errorMessage, setter, onKeyDown }: TextFieldProps) {
  const [isValid, setIsValid] = useState(true)
  const setSubmitCond = useSetRecoilState(submitState)

  const ChangeHandler = (event: any) => {
    setter(event.target.value)
    setIsValid(valid(event.target.value))
    setSubmitCond(true)
  }
  const submitHandler = (event: any) => {
    event.preventDefault()
  }

  return (
    <Box component="form" onSubmit={submitHandler}>
      {isValid ?
        <TextField
          sx={{width: textFieldAttr.width, marginBottom: textFieldAttr.marBot, marginRight: textFieldAttr.marRig}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.isPw ? 'password' : ""}
          autoFocus={textFieldAttr.isAf ? true : false}
          variant="outlined"
          size="small"
          onChange={ChangeHandler}
          onKeyDown={onKeyDown}
        /> :
        <TextField
          error
          sx={{width: textFieldAttr.width, marginBottom: textFieldAttr.marBot, marginRight: textFieldAttr.marRig}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.isPw ? 'password' : ""}
          helperText={errorMessage}
          size="small"
          onChange={ChangeHandler}
          onKeyDown={onKeyDown}
        />
      }
    </Box>
  )
}
