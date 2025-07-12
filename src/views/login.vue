<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <p v-if="errors.general" class="text-red-500 text-sm mb-4 text-center">
          {{ errors.general }}
        </p>

        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p v-if="errors.general" class="text-red-500 text-sm mt-4 text-center">
          {{ errors.general }}
        </p>
        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <router-link to="/register" class="text-blue-500 hover:underline">Daftar di sini</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      if (user.role_id === 'admin') {
        this.$router.push('/admin/dashboard')
      } else if (user.role_id === 'user') {
        this.$router.push('/user/profile')
      }
    }
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        }

        const response = await api.login(credentials)     // axios response
        const data = response.data                        // ambil data dari response
        const user = data.user                            // baru ambil user dari data

        if (!user) {
          this.errors.general = 'Data user tidak ditemukan di response login'
          return
        }

        // Simpan token dan user ke localStorage
        localStorage.setItem('token', data.access_token)

        // mapping role_id angka ke string
        const roleMap = {
          1: 'admin',
          2: 'user'
        }
        user.role_id = roleMap[user.role_id] || 'guest'
        localStorage.setItem('user', JSON.stringify(user))

        console.log('DATA USER:', user)
        console.log('Token:', data.access_token)

        // Redirect
        if (user.role_id === 'admin') {
          this.$router.push('/admin/dashboard')
        } else if (user.role_id === 'user') {
          this.$router.push('/user/profile')
        } else {
          this.$router.push('/')
        }

      } catch (error) {
        console.error('Login gagal:', error.response?.data?.message || error.message)
        this.errors.general = 'Login gagal. Silakan coba lagi.'
      }
    }
  }
}
</script>