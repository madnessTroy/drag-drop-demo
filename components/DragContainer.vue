<template>
	<div
		@dragover.prevent
		@dragstart="handleDragStart($event)"
		draggable="true">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { dragKeyConstant } from '~/constants/index'
import type { AvailableDragElement } from '~/@types/drag.types'

const props = defineProps<{
	elementType: AvailableDragElement
}>()

const randomId = ref(Date.now())

const elementType = computed(() => props.elementType)

const handleDragStart = (evt: DragEvent) => {
	evt.dataTransfer!.setData(dragKeyConstant.DRAG_GENERAL_KEY, dragKeyConstant.DRAG_ITEM_KEY)

	const dragInfo: DragInfo = {
		id: randomId.value++,
		element: elementType.value,
		isDragging: false,
	}

	evt.dataTransfer!.setData(dragKeyConstant.DRAG_INFO_KEY, JSON.stringify(dragInfo))
}
</script>
