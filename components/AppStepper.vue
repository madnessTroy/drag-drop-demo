<template>
   <el-steps style="max-width: 600px" :active="1">
    <el-step title="Step 1" :icon="Check" />
    <el-step title="Step 2" :icon="Check" />
    <el-step title="Step 3" :icon="Check" />
  </el-steps>
</template>

<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
</script>

