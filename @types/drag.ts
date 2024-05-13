export type DragInfo = {
	id: number
	element: string
	isChangePosition: boolean
}

export type DragElement = Omit<DragInfo, 'x' | 'y'> & {
	left: string
	top: string
	value: null | string
}
