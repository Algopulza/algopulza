export const getLocalTime = () => {
  const pad = (digit: number) => {
    if (digit < 10) {
      return '0' + digit
    }
    return digit
  }

  const currentTime = new Date()
  let currKTime =
    currentTime.getFullYear() + '-' +
    pad(currentTime.getMonth() + 1) + '-' +
    pad(currentTime.getDate()) + 'T' +
    pad(currentTime.getHours()) + ':' +
    pad(currentTime.getMinutes()) + ':' +
    pad(currentTime.getSeconds()) + '.' +
    (currentTime.getMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z'

  return currKTime
}