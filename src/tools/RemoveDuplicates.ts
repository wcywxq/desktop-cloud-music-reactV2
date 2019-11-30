/**
 * 去除数组对象中的重复值
 * @param data
 * @returns {any[]}
 */
export function removeDuplicates(data: any) {
    let newData = [];
    let obj = {} as any;

    for (let i = 0; i < data.length; i++) {
        if (!obj[data[i].key]) {
            newData.push(data[i]);
            obj[data[i].key] = true
        }
    }

    return newData
}
