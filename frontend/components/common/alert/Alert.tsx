import { toast } from 'react-toastify'

export const showToastError = (msg: string) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 800,
    hideProgressBar : true
  })
}

export const showToastSuccess = (msg: string) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 800,
    hideProgressBar : true
  })
}