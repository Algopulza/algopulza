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

export const setTimeFormatByDate = (timestring: string) => {
  if (timestring == null) {
    return '-'
  }
  return timestring.slice(2, 4) + '년' + timestring.slice(5, 7) + '월' + timestring.slice(8, 10) + '일'
}

export const setTimeFormatFromHour = (timestring: string) => {
  if (timestring == null) {
    return ''
  }
  return timestring.slice(11, 13) + '시' + timestring.slice(14, 16) + '분'
}