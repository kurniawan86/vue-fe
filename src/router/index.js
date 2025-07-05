import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import UserLayout from '../components/UserLayout.vue'
import DefaultLayout from "../views/DefaultLayout.vue";

const routes = [
  // Layout default (Login & Register)
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('../views/login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/register.vue')
      }
    ]
  },

  // Layout untuk Admin
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../views/admin/Users.vue')
      }
    ]
  },

  // Layout untuk User
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('../views/UserPage.vue')
      }
    ]
  },

  // Redirect jika route tidak ditemukan
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router