export default function (dropzoneRef) {
	const dropzoneBoundry = computed(
		() => dropzoneRef.value && dropzoneRef.value.getBoundingClientRect(),
	)
}
