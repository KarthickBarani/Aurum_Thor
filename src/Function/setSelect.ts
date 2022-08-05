export const setIsSelectProperty = (array) => {
    const finalArray: any[] = []
    array?.forEach(element => {
        finalArray.push({ ...element, isSelect: false })
    })
    return finalArray
}