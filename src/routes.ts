import { createRouter, createWebHistory } from 'vue-router'

const MapView = () => import('@/views/MapView.vue')
const Login = () => import('@/views/Login.vue')

const routes = [
  { path: '/', component: MapView },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
