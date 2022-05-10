import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TextFieldAttr } from '../../util/dto'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  valid: boolean
  validMessage: string
  onChange(event: any): void
}

export default function InputTextField({ textFieldAttr, valid, validMessage, onChange }: TextFieldProps) {
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
          helperText={validMessage}
          autoFocus={textFieldAttr.autofocus ? true : false}
          size="small"
          onChange={onChange}
        />
      }
    </Box>
  )
}
