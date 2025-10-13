<script setup lang="ts">import { ref } from 'vue'
    import { createApp } from 'vue'

    const homePage = ref('home')</script>

<template>
    <div class="home">
        <div class="join">Join</div>
        <div class="create">Create</div>
    </div>
</template>

<style scoped>
    .home {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

    }
    .join {
        font-family: Cambria;
        font-size: 30px;
        margin-top: 30px;
    }
    .create {
        font-family: Cambria;
        font-size: 30px;
        margin-top: 30px;
    }
</style>