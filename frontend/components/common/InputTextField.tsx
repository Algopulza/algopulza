import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TextFieldAttr } from '../../util/dto'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  valid: boolean
  validMessage: string
  onChange(event: any): void
  onKeyDown(event: any): void
}

export default function InputTextField({ textFieldAttr, valid, value, validMessage, onChange, onKeyDown }: TextFieldProps) {
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
      {valid ?
        <TextField
          sx={{width: textFieldAttr.width, marginBottom: 1}}
          id={textFieldAttr.id}
          label={textFieldAttr.label}
          type={textFieldAttr.password ? 'password' : ""}
          autoFocus={textFieldAttr.autofocus ? true : false}
          variant="outlined"
          size="small"
          onChange={onChange}
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
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      }
    </Box>
  )
}
