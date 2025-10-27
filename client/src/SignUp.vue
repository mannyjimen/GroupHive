<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'
    import axios from 'axios'

    const email = ref('')
    const username = ref('') 
    const password = ref('')

    const error = ref('')
    const success = ref('')

    // 3. Replace the onClick function
    async function onClick() {
        error.value = ''
        success.value = ''

        const newUser = {
            email: email.value,
            username: username.value,
            password: password.value
        }

        try {
            // 4. Call your backend's register route
            const response = await axios.post('http://localhost:5000/api/users', newUser)
            console.log('server response:', response.data);
            alert('New User Created Succesfully');

            // 5. Handle success
            success.value = `User ${response.data.name} created! You can now sign in.`;
            
            // Clear the form
            email.value = ''
            username.value = ''
            password.value = ''

        } catch (err: any) {
            // 6. Handle errors (like "User already exists")
            if (err.response && err.response.data.message) {
                error.value = err.response.data.message;
            } else {
                error.value = 'An error occurred during sign up.';
            }
        }
    }
</script>

<template>
    <div class="form">
        <div class="signUp">Sign Up</div>
        <input class="email" v-model="email" placeholder="Email">
        <input class="user" v-model="username" placeholder="Username">
        <input class="pass" v-model="password" placeholder="Password">
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