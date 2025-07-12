import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import UserLayout from '../components/UserLayout.vue'
import DefaultLayout from "../views/DefaultLayout.vue";



const routes = [
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  // Jika belum login dan mau ke halaman admin/user, redirect ke login
  if (!user && (to.path.startsWith('/admin') || to.path.startsWith('/user'))) {
    return next('/')
  }

  // Jika sudah login dan mau ke login/register lagi, redirect ke dashboard sesuai role
  if (user && (to.path === '/' || to.path === '/register')) {
    if (user.role_id === 'admin') return next('/admin/dashboard')
    if (user.role_id === 'user') return next('/user/profile')
  }
  next()
})

export default router