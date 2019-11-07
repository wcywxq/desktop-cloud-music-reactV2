export function formatDuration(duration: number | [number, number]) {
  if (typeof duration === "number") {
    let minutes = Math.floor(duration / 1000 / 60).toString().padStart(2, '0')
    let seconds = Math.ceil(duration / 1000 % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }
  return [duration[0], duration[1]]
}