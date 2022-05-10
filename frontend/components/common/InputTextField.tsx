import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TextFieldAttr } from '../../states/dto'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  valid: boolean
  onChange(event: any): void
}

export default function InputTextField({ textFieldAttr, valid, onChange }: TextFieldProps) {


  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      {valid ?
        <TextField
          sx={{width: textFieldAttr.width}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.password ? 'password' : ""}
          autoFocus={textFieldAttr.autofocus ? true : false}
          variant="outlined"
          size="small"
          onChange={onChange}
        /> :
        <TextField
          error
          sx={{width: textFieldAttr.width}}
          id={textFieldAttr.id}
          label='Error'
          helperText="백준 아이디를 정확히 입력해주세요."
          autoFocus={textFieldAttr.autofocus ? true : false}
          size="small"
          onChange={onChange}
        />
      }
    </Box>
  )
}
