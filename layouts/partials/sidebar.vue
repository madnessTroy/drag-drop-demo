<template>
	<el-aside width="298px">
		<div class="p-4 border">
			<el-text size="large">Place fields</el-text>
		</div>
		<div class="p-4 border h-dvh">
			<el-text size="large">Fields</el-text>

			<drag-container element-type="text">
				<el-text>Text field</el-text>
			</drag-container>

			<drag-container element-type="date">
				<el-text>Date field</el-text>
			</drag-container>
		</div>
	</el-aside>
</template>
