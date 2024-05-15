export const isEmpty = (value: any) => {
	return ['', null, undefined].includes(value) || (Array.isArray(value) && value.length === 0)
}

export const isNumber = (number: any) => {
	return !isEmpty(number) && !isNaN(Number(number))
}
