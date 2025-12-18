<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'

    const email = ref('')
    const username = ref('') 
    const password = ref('')
    const realName = ref('')
    const bio = ref('')
    const gender = ref('')
    const location = ref('')
    const age = ref('')

    const error = ref('')
    const success = ref('')
    const router = useRouter()

    // 3. Replace the onClick function
    async function onClick() {
        error.value = ''
        success.value = ''

        const newUser = {
            email: email.value,
            username: username.value,
            password: password.value
        }

        const newProfile = {
            email: email.value,
            username: username.value,
            realName: realName.value
        }

        try {
            // 4. Call your backend's register route
            const response = await axios.post('https://grouphive-hu65.onrender.com/api/users', newUser)
            console.log('server response:', response.data);
            const profileResponse = await axios.post('https://grouphive-hu65.onrender.com/api/profiles', newProfile)

            // After successful signup, auto-login the user
            const loginResponse = await axios.post('https://grouphive-hu65.onrender.com/api/login', {
                username: username.value,
                password: password.value
            })

            // Store the JWT token
            const token = loginResponse.data.token
            localStorage.setItem('token', token)

            // Notify the app about auth change so header updates
            window.dispatchEvent(new Event('authChanged'))

            // 5. Handle success and redirect
            success.value = `Welcome ${username.value}! Your account has been created.`;
            
            // Clear the form
            email.value = ''
            username.value = ''
            password.value = ''

            // Redirect to homepage
            router.push('/')

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
        height: 500px;
        border-radius: 50px; 
        border: 1px solid black;
        outline: none;
    }
</style>