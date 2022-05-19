import { toast } from 'react-toastify'

export const showToast = (msg: string) => {
  toast(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    hideProgressBar : true
  })
}
