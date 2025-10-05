<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'

    const email = ref('')
    const user = ref('') 
    const pass = ref('')
    function onClick() {
        //Store to database
    }
</script>
<template>
    <div class="form">
        <div class="signUp">Sign Up</div>
        <input class="email" v-model="email" placeholder="Email">
        <input class="user" v-model="user" placeholder="Username">
        <input class="pass" v-model="pass" placeholder="Password">
        <button class="button" @click="onClick">Sign Up</button>
    </div>
</template>

<style scoped>
    .signUp{
        font-family: Cambria;
        font-size: 20px;
        margin: 0px 0px 50px 0px;
    }
    .user, .pass, .email {
        font-family: Cambria;
        width: 200px;
        margin: 5px 0px 5px 0px; /*top,right,bottom,left*/
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