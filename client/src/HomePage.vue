<script setup lang="ts">import { ref } from 'vue'
    import { createApp } from 'vue'

    const homePage = ref('home')</script>

<template>
    <div :class="homePage">Join</div>
    <div :class="homePage">Create</div>
</template>

<style scoped>
    .home {
    }
</style>