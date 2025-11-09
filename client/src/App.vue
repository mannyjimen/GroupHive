<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'
    import App from './App.vue'
    import HomePage from './HomePage.vue'
    import SignIn from './SignIn.vue'
    import SignUp from './SignUp.vue'
    import SearchPage from './SearchPage.vue'
    import CreateEvent from './CreateEvent.vue'
    import Profile from './Profile.vue'

    const titleClass = ref('title')
    const main = ref(true)
    const signInVar = ref(false)
    const signUpVar = ref(false)
    const searchPage = ref(false)
    const createEvent = ref(false)
    const profile = ref(false)
    //Add user tracking and log out
    const noUser = ref(false)
    function logout() {
        noUser.value = true;
    }

</script>

<template>
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

    <router-view />
    
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap');


:global(body) {
  background-color: #FFFFE0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
}

.title {
  font-size: 30px; /* keep same size */
  
  /* === FONT IS LOBSTER === */
  font-family: 'Lobster', cursive; 
  font-style: normal; /* Removed italic, as Lobster is already a script */
  

  margin-left: 30px; 
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.line {
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