<template>
    <el-container id="app-container" class="is-vertical">
        <slot />
    </el-container>
</template>

<style lang="scss">
#app-container {
    max-width: 1440px;
    overflow-x: hidden;
    margin-inline: auto;

    background-color: white;
}
</style>