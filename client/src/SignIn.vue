<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'

    const user = ref('') //Value would be saved to user
    const pass = ref('') //Value would be saved to pass
    function onClick() {
        this.$root.$emit('loggingIn');
        //Function does not work will check later
        //1. Sign in
        //2. Go to search page
    }
</script>

<template>
    <div class="form">
        <div class="signIn">Sign In</div>
        <input class="user" v-model="user" placeholder="Username">
        <input class="pass" v-model="pass" placeholder="Password">
        <button class="button" @click="onClick">Sign In</button>
        <!-- To see value
        <p>{{ user }}</p>
        <p>{{ pass }}</p>
        -->
    </div>
</template>

<style scoped>
    .signIn {
        font-family: Cambria;
        font-size: 20px;
        margin: 0px 0px 50px 0px;
    }
    .user, .pass {
        font-family: Cambria;
        width: 200px;
        margin: 5px 0px 5px 0px;
    }
    .button {
        font-family: Cambria;
        width: 210px;
        margin: 10px 0px 0px 0px;
    }
    .form {
        display: flex;
        justify-content: center; /* Centers horizontally */
        align-items: center; /* Centers vertically */
        margin: 25px auto;
        padding: 10px;
        flex-direction: column;
        width: 300px;
        height: 400px;
        justify-content: center;
        border-radius: 50px;
        border: 1px solid black;
        outline: none;
    }

</style>