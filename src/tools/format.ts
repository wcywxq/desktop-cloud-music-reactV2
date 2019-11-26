export function formatDuration(duration: number | [number, number]) {
  if (typeof duration === "number") {
    let minutes = Math.floor(duration / 1000 / 60).toString().padStart(2, '0')
    let seconds = Math.ceil(duration / 1000 % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }
  return [duration[0], duration[1]]
}

export function getWeekDay() {
  let weekDay = new Date().getDay();
  switch (weekDay) {
    case 0:
      return "日"
    case 1:
      return "一"
    case 2:
      return "二"
    case 3:
      return "三"
    case 4:
      return "四"
    case 5:
      return "五"
    case 6:
      return "六"
  }
}

export const getDay = () => new Date().getDate();