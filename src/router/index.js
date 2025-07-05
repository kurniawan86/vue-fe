import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import AdminPage from '../views/AdminPage.vue'
import UserPage from '../views/UserPage.vue'
import Register from '../views/Register.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  // { path: '/admin/dashboard', component: AdminPage },
  { path: '/user/dashboard', component: UserPage },
  { path: '/register', component: Register },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/Users.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router