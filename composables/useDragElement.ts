import { dragKeyConstant } from '~/constants'
import { commonHelpers } from '~/helpers'

export default function () {
	const randomId = ref(Date.now())

	const getElementInfoToDrag = (elementName) => {
		return dragKeyConstant.MAPPING_DRAG_COMPONENT[elementName]
	}

	const generateDragImage = (elementName) => {
		const elementInfo = getElementInfoToDrag(elementName)

		if (commonHelpers.isEmpty(elementInfo)) return

		const dragImage = document.createElement('div')
		dragImage.className += elementInfo.dragImage.className
		dragImage.innerHTML = elementInfo.dragImage.text
		document.body.appendChild(dragImage)

		return dragImage
	}

	const onDragStartInitElement = (evt, elementName) => {
		evt.dataTransfer!.setData(dragKeyConstant.DRAG_GENERAL_KEY, dragKeyConstant.DRAG_ITEM_KEY)

		const elementInfo = {
			id: randomId.value,
			isDragging: false,
			isFocus: false,
			...getElementInfoToDrag(elementName),
		}

		const dragImage = generateDragImage(elementName)

		evt.dataTransfer!.setDragImage(dragImage, 25, 25)
		evt.dataTransfer!.setData(dragKeyConstant.DRAG_INFO_KEY, JSON.stringify(elementInfo))
	}

	return { getElementInfoToDrag, onDragStartInitElement }
}
