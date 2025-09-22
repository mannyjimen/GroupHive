<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'

    const signUp = ref('sign')
    const email = ref('')
    const user = ref('') 
    const pass = ref('')
</script>
<template>
    <div :class="signUp">Sign Up</div>
    <input v-model="email" placeholder="Email">
    <input v-model="user" placeholder="Username">
    <input v-model="pass" placeholder="Password">
</template>

<style scoped>
    .sign {
    }
</style>