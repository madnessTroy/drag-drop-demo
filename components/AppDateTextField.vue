<template>
	<input
		type="text"
		v-model="formattedValue"
		placeholder="YYYY-MM-DD"
		@input="onInput"
		@keydown="onKeydown"
		@focus="onFocus"
		maxlength="10" />
</template>

<script setup lang="ts">
const formattedValue = ref('')

const onInput = (event: Event) => {
	const input = event.target as HTMLInputElement
	let value = input.value.replace(/[^0-9]/g, '')

	if (value.length > 4 && value.length <= 6) {
		value = value.slice(0, 4) + '-' + value.slice(4)
	} else if (value.length > 6) {
		value = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 8)
	}

	formattedValue.value = value
}

const onKeydown = (event: KeyboardEvent) => {
	const input = event.target as HTMLInputElement
	const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab']

	// Allow only numbers and specific keys
	if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
		console.log('wrong')
		event.preventDefault()
	}

	// Handle deletion of hyphens
	if (event.key === 'Backspace') {
		const cursorPos = input.selectionStart
		if (cursorPos === 5 || cursorPos === 8) {
			formattedValue.value =
				formattedValue.value.slice(0, cursorPos - 1) + formattedValue.value.slice(cursorPos)
			setTimeout(() => {
				input.setSelectionRange(cursorPos - 1, cursorPos - 1)
			})
			event.preventDefault()
		}
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

// Ensure the formatted value is updated correctly
watch(formattedValue, (newValue) => {
	if (newValue.length === 10) {
		const year = parseInt(newValue.slice(0, 4))
		const month = parseInt(newValue.slice(5, 7))
		const day = parseInt(newValue.slice(8, 10))

		// Validate the date components
		if (month < 1 || month > 12 || day < 1 || day > 31) {
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
}
</style>
