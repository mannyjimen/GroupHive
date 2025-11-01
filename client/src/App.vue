<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'
    import App from './App.vue'
    import HomePage from './HomePage.vue'
    import SignIn from './SignIn.vue'
    import SignUp from './SignUp.vue'
    import SearchPage from './SearchPage.vue'
    import CreateEvent from './CreateEvent.vue'

    const titleClass = ref('title')
    const main = ref(true)
    const signInVar = ref(false)
    const signUpVar = ref(false)
    const searchPage = ref(false)
    const createEvent = ref(false)

    function mainPage() {
        main.value = true
        searchPage.value = false
        signInVar.value = false
        signUpVar.value = false
        createEvent.value = false
    }

    function logIn() {
        //If true go to searchpage
        searchPage.value = true
        main.value = false
        signInVar.value = false
        signUpVar.value = false
        createEvent.value = false
    }
    function signIn() {
        main.value = false
        signInVar.value = true
        signUpVar.value = false
        searchPage.value = false
        createEvent.value = false
    }
    function signUp() {
        main.value = false
        signInVar.value = false
        signUpVar.value = true
        searchPage.value = false
        createEvent.value = false
    }
    function goToSearch() 
    {
        searchPage.value = true
        main.value = false
        signInVar.value = false
        signUpVar.value = false
        createEvent.value = false
    }
    function goToCreate()
    {
        searchPage.value = false
        main.value = false
        signInVar.value = false
        signUpVar.value = false
        createEvent.value = true
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
        <div class="sign">
            <router-link to="/signin"><button class='sign1'>Sign In</button></router-link>
            <router-link to="/signup"><button class='sign2'>Sign Up</button></router-link>
        </div>
        
        
        <!--
        <button :class="titleClass" @click="mainPage">GroupHive</button>
        <div class="navigate">
            <button class="home" @click="mainPage">Home</button>
            <button class="join" @click="goToSearch">Join</button>
            <button class="create" @click="goToCreate">Create</button>
             //Can add later About and Profile

        </div>
        <div class="sign">
            <button class='sign1' @click="signIn">Sign In</button>
            <button class='sign2' @click="signUp">Sign Up</button>
        </div>-->
    </div>
    <div class="line"></div>


    <router-view />

    <!--<HomePage v-if="main" />
    <SignIn v-else-if="signInVar" @loggingIn="logIn"/>
    <SignUp v-else-if="signUpVar" />
    <SearchPage v-else-if="searchPage"/>
    <CreateEvent v-else-if="createEvent"/>

    
    
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