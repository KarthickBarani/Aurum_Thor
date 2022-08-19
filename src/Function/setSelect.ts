export const setIsSelectProperty = (array) => {
    const finalArray: any[] = []
    for (let i = 0; i < array.length; i++) {
        finalArray.push({ ...array[i], isSelect: false })
    }
    return finalArray
}