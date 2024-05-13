<template>
	<div
		@dragover.prevent
		@drop="handleDrop($event)"
		ref="dropzoneRef"
		class="h-dvh w-full border bg-white rounded relative overflow-x-hidden">
		<template v-if="dropItems.length">
			<!-- :value="value"
					@change="handleChangeValue($event, id)" -->
			<template
				v-for="{ id, element, value, ...styles } in dropItems"
				:key="id">
				<component
					:is="element === 'app-date-field' ? AppDateField : element"
					:style="{ ...styles }"
					:value="value"
					@input="handleInput($event.target.value, id)"
					@change="handleChangeValue($event.target.value, id)"
					@date-change="(value) => handleChangeValue(value, id)"
					class="border w-30 absolute"
					draggable="true"
					@dragover.prevent
					@dragstart="handleChangePosition($event, id)" />
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import { dragKeyConstant, storageKeyConstant } from '~/constants/index'
import { commonHelpers } from '~/helpers/index'
import { storageServices } from '~/services/index'

import { type DragElement } from '~/@types/drag'

const dropzoneRef = ref<HTMLDivElement>(null)
const dropItems = ref<DragElement[]>([])

const dropzoneBoundry = computed(() => dropzoneRef.value!.getBoundingClientRect())

const findIndexDropById = (id: DragElement['id']) => {
	return dropItems.value.findIndex((item) => item.id.toString() === id.toString())
}

const AppDateField = resolveComponent('app-date-field')

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

	const offset = {
		left: dropPosition.x - dropzoneBoundry.value.left + 'px',
		top: dropPosition.y - dropzoneBoundry.value.top + 'px',
	}

	// New Item
	if (!dragInfo.isChangePosition) {
		dropItems.value.push({
			...dragInfo,
			...offset,
			value: '',
		})
		storageServices.saveLocalItem(storageKeyConstant.STORAGE_DRAG_ITEMS, dropItems.value)
		return
	}

	// Edit Position existed item
	const itemToMove = findIndexDropById(dragInfo.id)
	dropItems.value[itemToMove] = {
		...dragInfo,
		...offset,
		isChangePosition: false,
	}
	storageServices.saveLocalItem(storageKeyConstant.STORAGE_DRAG_ITEMS, dropItems.value)
}

const handleChangePosition = (evt: DragEvent, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)

	if (itemToMove >= 0) {
		const newPosition: DragInfo = {
			...dropItems.value[itemToMove],
			isChangePosition: true,
		}

		evt.dataTransfer!.setData(dragKeyConstant.DRAG_GENERAL_KEY, dragKeyConstant.DRAG_ITEM_KEY)
		evt.dataTransfer!.setData(dragKeyConstant.DRAG_INFO_KEY, JSON.stringify(newPosition))
	}
}

const handleInput = (value: string, id: DragElement['id']) => {
	const itemToMove = findIndexDropById(id)

	if (!value || itemToMove < 0) return

	dropItems.value[itemToMove] = {
		...dropItems.value[itemToMove],
		value,
	}
}

const handleChangeValue = (value: string, id) => {
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
	if (savedDragItem) return (dropItems.value = savedDragItem)
})
</script>
