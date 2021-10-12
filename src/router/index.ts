import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Menu from '../views/Menu.vue'

import { Auth0 } from '@/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {requiresNavBar: false},
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {requiresNavBar: true},
    component: Profile,
    beforeEnter: Auth0.routeGuard
  },
  {
    path: '/menu',
    name: 'menu',
    meta: {requiresNavBar: true},
    component: Menu,
    beforeEnter: Auth0.routeGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
