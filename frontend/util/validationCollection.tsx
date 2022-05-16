export const checkSpace = (item: string) => {
  if (item.trim() === '') {
    return false
  } else {
    return true
  }
}

export const checkId = (id: string) => {
  if (id.trim() === '') {
    return false
  } else {
    return true
  }
}

export const checkPassword = (password: string) => {
  if (password.trim() === '') {
    return false
  } else {
    return true
  }
}

export const nothing = (password: string) => {
  return true
}