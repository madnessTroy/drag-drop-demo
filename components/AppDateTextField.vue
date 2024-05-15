<template>
	<input
		type="text"
		:draggable="props.draggable"
		v-model="formattedValue"
		@input="onInput"
		@keydown="onKeydown"
		@focus="onFocus"
		placeholder="YYYY-MM-DD"
		maxlength="10" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
	value: string
	draggable: 'true' | 'false'
}>()

const emits = defineEmits(['date-change'])

const formattedValue = ref(props.value || '')
const rawValue = ref('')

const onInput = (event: Event) => {
	const input = event.target as HTMLInputElement
	let value = input.value.replace(/[^0-9]/g, '')

	if (value.length <= 8) {
		let year = value.slice(0, 4)
		let month = value.slice(4, 6)
		let day = value.slice(6, 8)

		if (month.length > 0) {
			year += '-'
		}
		if (day.length > 0) {
			month += '-'
		}

		formattedValue.value = `${year}${month}${day}`
	} else {
		formattedValue.value = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 8)
	}

	// Move the cursor to the right place
	setTimeout(() => {
		const cursorPosition = formattedValue.value.length
		input.setSelectionRange(cursorPosition, cursorPosition)
	})
}

const onKeydown = (event: KeyboardEvent) => {
	const input = event.target as HTMLInputElement

	// Prevent entering non-numeric values except for navigation keys
	const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab']
	if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
		event.preventDefault()
	}

	// Handle deletion of hyphens
	if (event.key === 'Backspace' && (input.selectionStart === 5 || input.selectionStart === 8)) {
		rawValue.value = rawValue.value.slice(0, -1)
		formattedValue.value = formattedValue.value.slice(0, -1)
		event.preventDefault()
		setTimeout(() => {
			const cursorPosition = formattedValue.value.length
			input.setSelectionRange(cursorPosition, cursorPosition)
		})
	}
}

const onFocus = (event: FocusEvent) => {
	const input = event.target as HTMLInputElement
	// Set cursor position to end on focus
	setTimeout(() => {
		const cursorPosition = input.value.length
		input.setSelectionRange(cursorPosition, cursorPosition)
	})
}

watch(formattedValue, (newValue) => {
	if (newValue.length === 10) {
		const year = parseInt(newValue.slice(0, 4))
		const month = parseInt(newValue.slice(5, 7))
		const day = parseInt(newValue.slice(8, 10))

		// Validate the date components
		if (month < 1 || month > 12 || day < 1 || day > 31) {
			rawValue.value = rawValue.value.slice(0, -1)
			formattedValue.value = formattedValue.value.slice(0, -1)
		}
	}
})
</script>

<style scoped>
input {
	width: 150px;
	padding: 5px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: white;
	z-index: 10;
}
</style>
