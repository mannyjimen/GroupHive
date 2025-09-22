<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'

    const signIn = ref('sign')
    const user = ref('') //Value would be saved to user
    const pass = ref('') //Value would be saved to pass
    function onClick() {
        this.$emit('loggingIn');
    }
</script>

<template>
    <div class="form">
        <div :class="signIn">Sign In</div>
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
    .sign {
    }
    .user, .pass {
        width: 200px;
    }
    .button {
        width: 210px;
    }
    .form {
        display:flex;
        flex-direction:column;
        width: 100%;
        height: 75%;
        justify-content:center;
        justify-content:space-between;
    }

</style>