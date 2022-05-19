export function setCookie(key: string, value: string, duration: number) {
  const current = new Date()
  current.setDate(current.getDate() + (duration * 24 * 60 * 60 * 1000))

  document.cookie = key + "=" + value + ";path=/;expires=" + current.toUTCString() + ';'
}

export function delCookie(key: string) {
  const expiration = new Date()
  
  document.cookie = key + "=;path=/;expires=" + expiration.toUTCString() + ';'
}