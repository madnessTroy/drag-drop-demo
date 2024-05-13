export const compareArray = (arr1: Array<any>, arr2: Array<any>) => {
	return (
		Array.isArray(arr1) &&
		Array.isArray(arr2) &&
		arr1.length === arr2.length &&
		arr1.every((val, index) => val === arr2[index])
	)
}
