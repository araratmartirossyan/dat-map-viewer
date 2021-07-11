import { createRouter, createWebHistory } from 'vue-router'

const MapView = () => import('@/views/MapView.vue')
const Login = () => import('@/views/Login.vue')

const routes = [
  { path: '/', component: MapView, meta: { requiresAuth: true } },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: `/login?claimId=${to.query.claimId}`,
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    }
  }
})

export default router
