import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Menu from '../views/Menu.vue'
import SessionPage from '../views/SessionPage.vue'
import TablePlan from '../views/TablePlan.vue'
import QRGenTest from '../views/QRGenTest.vue'
import CreateSession from '../components/CreateSession.vue'

import { Auth0 } from '@/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {requiresNavBar: true},
    component: Home
  },
  {
    path: '/menu',
    name: 'menu',
    meta: {requiresNavBar: true},
    component: Menu,
  },
  {
    path: '/table_plan',
    name: 'tableplan',
    meta: {requiresNavBar: true},
    component: TablePlan,
  },
  {
    path: '/qr',
    name: 'qr',
    meta: { requiresNavBar: true },
    component: QRGenTest,
  },
  {
    path: '/session_page',
    name: 'sessionpage',
    meta: {requiresNavBar: false},
    component: SessionPage,
  },
  
  {
    path: '/profile',
    name: 'profile',
    meta: {requiresNavBar: true},
    component: Profile,
    beforeEnter: Auth0.routeGuard
  },
  {
    path: '/session',
    name: 'createsessions',
    meta: { requiresNavBar: false },
    component: CreateSession,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
