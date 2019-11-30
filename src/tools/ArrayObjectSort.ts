/**
 * 数组对象比较方法
 * @param {string} props
 * @returns {(obj1: any, obj2: any) => (number)}
 */
export const compare = (props: string) => {
    return function (obj1: any, obj2: any) {
        let val1 = obj1[props];
        let val2 = obj2[props];
        if (val1 < val2) {
            return -1
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }
    }
};
