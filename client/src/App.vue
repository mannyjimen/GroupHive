<script setup lang="ts">
    import { ref } from 'vue'
    import { createApp } from 'vue'
    import App from './App.vue'
    import HomePage from './HomePage.vue'
    import SignIn from './SignIn.vue'
    import SignUp from './SignUp.vue'
    import SearchPage from './SearchPage.vue'

    const titleClass = ref('title')
    const main = ref(true)
    const signInVar = ref(false)
    const signUpVar = ref(false)
    const searchPage = ref(false)

    function logIn() {
        //If true go to searchpage
        searchPage.value = true
        main.value = false
        signInVar = false
        signUpVar = false
    }
    function signIn() {
        main.value = false
        signInVar.value = true
        signUpVar.value = false
        searchPage.value = false
    }
    function signUp() {
        main.value = false
        signInVar.value = false
        signUpVar.value = true
        searchPage.value = false
    }
    function goToSearch() 
    {
    searchPage.value = true
    main.value = false
    signInVar.value = false
    signUpVar.value = false
    }
</script>

<template>
    <div class="header">
        <h1 :class="titleClass">GroupHive</h1>
        <div class="sign">
            <button class='sign1' @click="signIn">Sign In</button>
            <button class='sign2' @click="signUp">Sign Up</button>
            <button class='searchBtn' @click="goToSearch">🔍</button>
        </div>
    </div>
    <div class="line"></div>
    <HomePage v-if="main" />
    <SignIn v-else-if="signInVar" @loggingIn="logIn"/>
    <SignUp v-else-if="signUpVar" />
    <SearchPage v-else-if="searchPage"/>
    
</template>

<style scoped>
.title{
    font-size: 25px;
}
.sign1, .sign2{
    margin: 5px;
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
    font-size: 18px;
    cursor: pointer;
}
</style>