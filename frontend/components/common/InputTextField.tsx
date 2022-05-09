import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TextFieldAttr } from '../landing/Form'

type TextFieldProps = { 
  textFieldAttr: TextFieldAttr
  onChange(event: any): void
}

export default function InputTextField({ textFieldAttr, onChange }: TextFieldProps) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{width: textFieldAttr.width}}
        id={textFieldAttr.id}
        label={textFieldAttr.label}
        type={textFieldAttr.password ? 'password' : ""}
        autoFocus={textFieldAttr.autofocus ? true : false}
        variant="outlined"
        size="small"
        onChange={onChange}
      />
    </Box>
  )
}
