export const getIsDuplicate = (arr1: string | string[], arr2: string[]) => {
    if (typeof arr1 === "string") {
        return arr2.includes(arr1)
    } else {
        return [...arr1, ...arr2].filter((item) => arr1.includes(item) && arr2.includes(item)).length > 0
    }
}