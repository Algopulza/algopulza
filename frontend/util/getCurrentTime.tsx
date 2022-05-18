export const getCurrentTime = () => {
  const currentTime = new Date()
  const utcNow = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60 * 1000)
  const koreaTimeDiff = 9 * 60 * 60 * 1000
  
  return new Date(utcNow + koreaTimeDiff)
}