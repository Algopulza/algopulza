import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { TextFieldAttr } from '../../../util/dto'
import { useRecoilState } from 'recoil'
import { idState, passwordState } from '../../../util/stateCollection'
import { validId } from '../../../util/validationCollection'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  valid(item: string): boolean
  validMessage: string
  onKeyDown(event: any): void
  state: any
}

export default function InputTextField({ textFieldAttr, valid, validMessage, state, onKeyDown }: TextFieldProps) {
  const [isValid, setIsValid] = useState(true)

  const handleChange = (event: any) => {
    state(event.target.value)
    console.log(valid(event.target.value))
    setIsValid(valid(event.target.value))
  }

  const submitHandler = (event: any) => {
    event.preventDefault()
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      {isValid ?
        <TextField
          sx={{width: textFieldAttr.width, marginBottom: 1, marginRight: textFieldAttr.marginRight}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.password ? 'password' : ""}
          autoFocus={textFieldAttr.autofocus ? true : false}
          variant="outlined"
          size="small"
          onChange={handleChange}
          onKeyDown={onKeyDown}
        /> :
        <TextField
          error
          sx={{width: textFieldAttr.width}}
          id={textFieldAttr.id}
          label='Error'
          helperText={validMessage}
          autoFocus={textFieldAttr.autofocus ? true : false}
          size="small"
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
      }
    </Box>
  )
}
