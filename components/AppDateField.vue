<template>
	<component
		:is="props.draggable ? 'div' : 'template'"
		:draggable="props.draggable">
		<el-date-picker
			v-model="dateSelected"
			@change="handleChange"
			type="date"
			placeholder="Pick a day"
			value-format="YYYY-MM-DD" />
	</component>
</template>

<script setup lang="ts">
const props = defineProps<{
	value: string
	draggable: 'true' | 'false'
}>()

const emits = defineEmits(['date-change'])

const dateSelected = ref(props.value || '')

const handleChange = () => {
	emits('date-change', dateSelected.value)
}
</script>
