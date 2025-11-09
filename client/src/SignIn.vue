<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import HomePage from './HomePage.vue'

    const username = ref('') //Value would be saved to user
    const password = ref('') //Value would be saved to pass
    const error = ref('') //  Add an error ref

    const router = useRouter() //  Get the router instance

    // Replace the onClick function
    async function onClick() {
        error.value = ''
        try {
            // Call your backend's login route
            const response = await axios.post('http://localhost:5000/api/login', {
                username: username.value,     // 'user' from form maps to 'name' in API
                password: password.value  // 'pass' from form maps to 'password' in API
            });

            // Get the token from the response
            const token = response.data.token;

            //store token in the browswer
            localStorage.setItem('token', token);

            // Redirect to the home page
            router.push('/'); 

        } catch (err: any) {
            //  Handle "Invalid credentials"
            if (err.response && err.response.data.message) {
                error.value = err.response.data.message;
            } else {
                error.value = 'An error occurred during sign in.';
            }
        }
    }
</script>

<template>
    <div class="form">
        <div class="signIn">Sign In</div>
        <input class="user" v-model="username" placeholder="Username">
        <input class="pass" v-model="password" placeholder="Password">
        <button class="button" @click="onClick">Sign In</button>

        <p v-if="error" class="error-message">{{ error }}</p>
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
        border-radius: 50px;
        border: 1px solid black;
        outline: none;
    }
    .error-message {
        color: red;
        font-family: Cambria;
        font-size: 14px;
        margin-top: 15px; /* Add some space */
    }

</style>