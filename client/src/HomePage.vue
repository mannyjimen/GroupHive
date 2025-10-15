<script setup lang="ts">import { ref } from 'vue'
    import { createApp } from 'vue'

    const homePage = ref('home')</script>

<template>
    <div class="intro">
        <div>
            Welcome to Group Hive!
        </div>
        <div>
            A platform where you can find, join, and create events!
        </div>
    </div>
    <div class="home">
        <input type="text" class="search-bar" placeholder="Search..." />
    </div>

</template>

<style scoped>
    .home {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

    }
    .join, .create {
        font-family: Cambria;
        font-size: 30px;
        margin-top: 30px;
    }
    .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: Cambria;
        font-size: 30px;
        margin-top: 30px;
    }
    .search-bar {
        flex: none; /* prevents it from stretching too much */
        width: 400px; /* ?? make it narrower (was 300px) */
        height: 30px; /* ?? makes it shorter */
        padding: 2px 12px; /* ?? smaller padding inside */
        border-radius: 999px; /* keeps oval shape */
        border: 2px solid #808080;
        outline: none;
        font-size: 14px;
        box-sizing: border-box;
        margin-top: 30px;
    }
</style>