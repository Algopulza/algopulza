import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import NavigationIcon from '@mui/icons-material/Navigation'

export default function ButtonFloating() {
  const clickHandler = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <Fab
      variant="extended"
      style={{ display: 'flex', position: 'fixed', right: 10, bottom: 10, zIndex: 999 }}
      onClick={clickHandler}
    >
      <NavigationIcon sx={{ mr: 1 }} />
      Top
    </Fab>
  )
}
