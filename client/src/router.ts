import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './HomePage.vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import SearchPage from './SearchPage.vue'
import CreateEvent from './CreateEvent.vue'

// 1. Define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  }
]

// 2. Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
})

// 3. Export the router
export default router