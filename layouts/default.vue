<template>
    <app-container class="rounded">
        <div id="root-layout">
            <Header />

            <el-container>
                <Sidebar />


                <slot />


                <OptionsSidebar />
            </el-container>
        </div>
    </app-container>
</template>

<script setup>
import Header from './partials/header.vue'
import OptionsSidebar from './partials/optionsSidebar.vue';
import Sidebar from './partials/sidebar.vue'
</script>