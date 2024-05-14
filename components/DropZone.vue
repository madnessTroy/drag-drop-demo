<template>
	<div
		@dragover.prevent
		@drop="handleDrop($event)"
		ref="dropzoneRef"
		class="h-dvh w-full border bg-white rounded relative overflow-x-hidden">
		<template v-if="dropItems.length">
			<template
				v-for="{ id, element, value, top, left } in dropItems"
				:key="id">
				<component
					:is="handleRender(element)"
					:value="value"
					@input="handleInput($event.target.value, id)"
					@change="handleChangeValue($event.target.value, id)"
					:style="{ ...parseStyle({ top, left }), cursor: 'grab' }"
					@date-change="(value) => handleChangeValue(value, id)"
					class="border w-30 absolute"
					draggable="true"
					ref="droppedItemRef"
					@dragover.prevent
					@dragstart="handleElementDragStart($event, id)"
					@drag="handleElementDrag($event, id)"
					@dragend="handleElementDragEnd($event, id)" />
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storageServices } from '~/services/index'
import { dragKeyConstant, storageKeyConstant } from '~/constants/index'
import type { AvailableDragElement } from '~/@types/drag.types'

const MAPPING_DRAG_COMPONENT: Record<AvailableDragElement, any> = {
	text: resolveComponent('app-autosize-text-field'),
	date: resolveComponent('app-date-text-field'),
}

const dropzoneRef = ref<HTMLDivElement>(null)
const dropItems = ref<DragElement[]>([])
const droppedItemRef = ref(null)

const dropzoneBoundry = computed(
	() => dropzoneRef.value && dropzoneRef.value.getBoundingClientRect(),
)

const handleRender = (elementType: AvailableDragElement) => MAPPING_DRAG_COMPONENT[elementType]

const findIndexDropById = (id: DragElement['id']) => {
	return dropItems.value.findIndex((item) => item.id.toString() === id.toString())
}

const parseStyle = (style: Record<string, number>) => {
	const result = {}
	for (const key in style) {
		result[key] = style[key] + 'px'
	}
	return result
}

const handleDrop = (evt: DragEvent) => {
	const check =
		evt.dataTransfer!.getData(dragKeyConstant.DRAG_GENERAL_KEY) ===
		dragKeyConstant.DRAG_ITEM_KEY
	if (!check) return

	const dragInfo = JSON.parse(evt.dataTransfer!.getData(dragKeyConstant.DRAG_INFO_KEY))
	const dropPosition = {
		x: evt.clientX,
		y: evt.clientY,
	}

	// New Item
	if (!dragInfo.isDragging) {
		const offset = {
			left: dropPosition.x - dropzoneBoundry.value.x,
			top: dropPosition.y - dropzoneBoundry.value.y,
		}

		dropItems.value.push({
			...dragInfo,
			left: offset.left,
			top: offset.top,
			value: '',
		})
		storageServices.saveLocalItem(storageKeyConstant.STORAGE_DRAG_ITEMS, dropItems.value)
		return
	}

	// Edit Position existed item
	const itemToMove = findIndexDropById(dragInfo.id)
	const offset = {
		left: dropPosition.x - dropzoneBoundry.value.x,
		top: dropPosition.y - dropzoneBoundry.value.y,
	}

	dropItems.value[itemToMove] = {
		...dragInfo,
		...offset,
	}
	storageServices.saveLocalItem(storageKeyConstant.STORAGE_DRAG_ITEMS, dropItems.value)
}

const handleElementDragStart = (evt: DragEvent, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)
	dropItems.value[itemToMove].isDragging = true
	const img = new Image()
	img.src =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/efRX9wAAAAASUVORK5CYII='
	evt.dataTransfer!.setDragImage(img, 0, 0)
}

const handleElementDrag = (evt: DragEvent, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)
	if (!dropItems.value[itemToMove].isDragging) return

	const dropzoneBoundry = dropzoneRef.value.getBoundingClientRect()
	const offset = {
		left: evt.clientX - dropzoneBoundry.left,
		top: evt.clientY - dropzoneBoundry.top,
	}

	dropItems.value[itemToMove] = {
		...dropItems.value[itemToMove],
		left: offset.left,
		top: offset.top,
	}
}

const handleElementDragEnd = (evt: DragEvent, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)
	dropItems.value[itemToMove].isDragging = false
}

const handleInput = (value: string, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)

	if (!value || itemToMove < 0) return

	dropItems.value[itemToMove] = {
		...dropItems.value[itemToMove],
		value,
	}
}

const handleChangeValue = (value: string, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)

	if (!value || itemToMove < 0) return

	dropItems.value[itemToMove] = {
		...dropItems.value[itemToMove],
		value,
	}

	storageServices.saveLocalItem(storageKeyConstant.STORAGE_DRAG_ITEMS, dropItems.value)
}

onMounted(() => {
	const savedDragItem = storageServices.getLocalItem(
		storageKeyConstant.STORAGE_DRAG_ITEMS,
	) as DragElement[]
	if (savedDragItem) dropItems.value = savedDragItem
})
</script>
