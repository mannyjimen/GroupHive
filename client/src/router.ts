import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './HomePage.vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import SearchPage from './SearchPage.vue'
import CreateEvent from './CreateEvent.vue'
import Profile from './Profile.vue'

//defining the routes
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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

//Creating the router instance
const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
})

// Exporting the router
export default router