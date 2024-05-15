export const DRAG_GENERAL_KEY = 'drag-item' as const
export const DRAG_INFO_KEY = 'drag-info' as const

export const DRAG_ITEM_KEY = 'drag-element' as const
export const DRAG_TEXT_FIELD = 'text-field' as const
export const DRAG_DATE_FIELD = 'date-field' as const

export const MAPPING_DRAG_COMPONENT = {
	date: {
		name: 'date',
		element: {
			type: 'text',
			position: {},
			defaultStyle: {},
		},
		dragImage: {
			className: 'drag-element-root drag-element-date-text',
			icon: '',
			text: 'Date signed',
		},
	},
	name: {
		name: 'name',
		element: {
			type: 'text',
			position: {},
			defaultStyle: {},
		},
		dragImage: {
			className: 'drag-element-root drag-element-name',
			icon: '',
			text: 'Name',
		},
	},
} as const
