import { toast } from 'react-toastify'

export const showToast = (msg: string) => {
  console.log('here')
  toast(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar : true
  })
}
