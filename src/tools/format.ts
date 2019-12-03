/**
 * 时间格式化
 * @param {number | [number, number]} duration
 * @returns {string | number[] | undefined}
 */
export function formatDuration(duration: number | [number, number]): string | number[] | undefined {
    if (duration) {
        if (typeof duration === "number") {
            let minutes = Math.floor(duration / 1000 / 60).toString().padStart(2, '0');
            let seconds = Math.ceil(duration / 1000 % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`
        }
        return [duration[0], duration[1]]
    }
}

/**
 * 获取星期几
 * @returns {string | undefined}
 */
export function getWeekDay(): string | undefined {
    let weekDay = new Date().getDay();
    switch (weekDay) {
        case 0:
            return "日";
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六"
    }
}

/**
 * 获取日期
 * @returns {number}
 */
export const getDay = (): number => new Date().getDate();
