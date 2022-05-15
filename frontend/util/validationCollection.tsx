export const validId = (id: string) => {
  if (id === '') {
    return false
  } else {
    return true
  }
}

export const validPassword = (password: string) => {
  if (password === '') {
    return false
  } else {
    return true
  }
}