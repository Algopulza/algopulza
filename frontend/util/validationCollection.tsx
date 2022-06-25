export const checkSpace = (item: string) => {
  if (item.trim() === "") {
    return false
  } else {
    return true
  }
}

export const checkId = (id: string) => {
  const idReg = /^[a-z0-9]{2,}$/
  const idTrimmed = id.trim()
  return idReg.test(idTrimmed) ? true : false
}

export const checkPassword = (password: string) => {
  const passwordReg = /^(?=.*[a-zA-Z])((?=.*\W)).{8,14}$/
  const pwTrimmed = password.trim()
  return passwordReg.test(pwTrimmed) ? true : false
}

export const nothing = (item: string) => {
  return true
}

export const checkStopwatch = (probId: string) => {
  const probIdReg = /^[0-9]/
  const probIdTrimmed = probId.trim()
  return probIdReg.test(probIdTrimmed) && Number(probIdTrimmed) >= 1000
    ? true
    : false
}
