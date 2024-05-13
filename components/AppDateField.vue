<template>
	<el-date-picker
		v-model="value"
		type="date"
		placeholder="Pick a day" />
</template>

<script setup lang="ts">
const props = defineProps({
	value: {
		type: String,
	},
})
const value = ref('')
</script>
