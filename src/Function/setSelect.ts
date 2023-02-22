export const setIsSelectProperty = (array: any[]) => {
    if (array && array.length > 0) {
        return array.map(el => ({ ...el, isSelect: false }))
    }
    return []
}