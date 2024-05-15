<template>
	<span
		class="textarea"
		role="textbox"
		ref="eleRef"
		contenteditable></span>
</template>

<script setup>
const eleRef = ref(null)

onMounted(() =>{
	
})
</script>

<style lang="scss">
.textarea {
	width: 30px;
	overflow: hidden;
	resize: both;
	min-height: 40px;
}
</style>
