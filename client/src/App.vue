<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useRouter } from 'vue-router'

    const titleClass = ref('title')
    const noUser = ref(true)
    const router = useRouter()

    function updateAuthState() {
        const token = localStorage.getItem('token')
        noUser.value = !token
    }

    onMounted(() => {
        updateAuthState()
        window.addEventListener('authChanged', updateAuthState)
    })

    onUnmounted(() => {
        window.removeEventListener('authChanged', updateAuthState)
    })

    async function logout() {
        try {
            await fetch('/api/logout', { method: 'POST', credentials: 'include' })
        } catch (err) {
            console.error('Logout request failed', err)
        }
        localStorage.removeItem('token')
        noUser.value = true
        window.dispatchEvent(new Event('authChanged'))
        router.push('/')
    }
</script>

<template>
    <div class="background-container">
        <div class="background-overlay"></div>
    </div>

    <div class="header">
        <router-link to="/">
            <button :class="titleClass">GroupHive</button>
        </router-link>

        <div class="navigate">
            <router-link to="/"><button class="home">Home</button></router-link>
            <router-link to="/search"><button class="join">Join</button></router-link>
            <router-link to="/create-event"><button class="create">Create</button></router-link>
        </div>
        <div class="sign" v-if="noUser">
            <router-link to="/signin"><button class='sign1'>Sign In</button></router-link>
            <router-link to="/signup"><button class='sign2'>Sign Up</button></router-link>
        </div>
        <div class="sign" v-else-if="!noUser">
            <button class='sign1' @click="logout">Logout</button>
            <router-link to="/profile"><button class='sign2'>Profile</button></router-link>
        </div>
    </div>
    
    <div class="line"></div>

    <div class="main-content">
        <router-view />
    </div>
    
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap');


:global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  /* Set a base color just in case the image takes a moment to load */
  background-color: #FDF6E3; 
}



.background-container {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2; 
    
    background-image: url('/background.png');
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
}


.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    background-color: rgba(255, 255, 255, 0.25);
}


.main-content {
    position: relative; 
    z-index: 1;
    width: 100%;
}


.title {
  font-size: 30px; 
  font-family: 'Inter', sans-serif; 
  font-weight: 800;                
  font-style: normal; 
  
  margin-left: 45px; 
  margin-top: 20px;                 
  
  border: none;
  background: none;
  padding: 10px;
  cursor: pointer; 
}

.home, .join, .create {
    font-family: Cambria;
    font-size: 15px;
    margin-right: 5px;
    margin-top: 30px;
    background: none;
    border: none;
}
.sign1 {
    font-family: Cambria;
    font-size: 15px;
    padding: 5px;
    margin-right: 10px;
    margin-top: 30px;
    background: none;
    border-radius: 5px;
}
.sign2 {
    font-family: Cambria;
    font-size: 15px;
    padding: 5px;
    margin-right: 30px;
    margin-top: 30px;
    background: none;
    border-radius: 5px;
}
.header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.line {
    position: relative;
    z-index: 1;
    background: black;
    height: 1px;
    width: 100%;
}
.searchBtn {
    margin-left: 5px;
    margin-right: 10px;
    font-size: 18px;
    cursor: pointer;
}
</style>
