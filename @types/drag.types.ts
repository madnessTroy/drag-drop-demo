export type AvailableDragElement = 'text' | 'date'

export type DragInfo = {
	id: number
	element: AvailableDragElement
	isDragging: boolean
	offsetX?: number
	offsetY?: number
}

export type DragElement = Omit<DragInfo, 'x' | 'y'> & {
	top: number
	left: number
	value: null | string
}
