<template>
	<div
		@dragover.prevent
		@dragstart="onDragStartInitElement($event, elementName)"
		draggable="true">
		<slot />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	elementName: any
}>()

const elementName = computed(() => props.elementName)

const { onDragStartInitElement } = useDragElement()
</script>
