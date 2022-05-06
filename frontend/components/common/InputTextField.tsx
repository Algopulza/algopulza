import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TextFieldAttr } from '../landing/Form'

type TextFieldProps = { textFieldAttr: TextFieldAttr }

export default function InputTextField({ textFieldAttr }: TextFieldProps) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: textFieldAttr.width },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={textFieldAttr.id}
        label={textFieldAttr.label}
        variant="outlined"
        size="small"
        type={textFieldAttr.password ? 'password' : ""}
        autoFocus={textFieldAttr.autofocus ? true : false}
      />
    </Box>
  )
}
