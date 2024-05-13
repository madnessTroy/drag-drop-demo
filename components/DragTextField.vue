<template>
	<div
		@dragover.prevent
		@dragstart="handleDragStart($event)"
		draggable="true">
		Text field
	</div>
</template>

<script lang="ts" setup>
import { dragKeyConstant } from '~/constants/index'

const randomId = ref(Date.now())

const handleDragStart = (evt: DragEvent) => {
	evt.dataTransfer!.setData(dragKeyConstant.DRAG_GENERAL_KEY, dragKeyConstant.DRAG_ITEM_KEY)

	const dragInfo: DragInfo = {
		id: randomId.value++,
		element: 'textarea',
		isChangePosition: false,
	}
	evt.dataTransfer!.setData(dragKeyConstant.DRAG_INFO_KEY, JSON.stringify(dragInfo))
}
</script>
