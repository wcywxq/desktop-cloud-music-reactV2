export function formatDuration(duration: number) {
  let minutes = Math.floor(duration / 1000 / 60).toString().padStart(2, '0')
  let seconds = Math.floor(duration / 1000 % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}