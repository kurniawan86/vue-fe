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
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      // Data statis: role_id 1 = admin, 2 = user
      staticUsers: [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role_id: 'admin'
        },
        {
          id: 2,
          name: 'Normal User',
          email: 'user@example.com',
          password: 'user123',
          role_id: 'user'
        }
      ]
    }
  },
  methods: {
    created() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        if (user.role_id === 1) {
          this.$router.push('/admin/dashboard')
        } else if (user.role_id === 'user') {
          this.$router.push('/user/profile')
        }
      }
    },
    // login() {
    //   this.errors = {}
    //
    //   // Validasi kosong
    //   if (!this.email) this.errors.email = 'Email is required'
    //   if (!this.password) this.errors.password = 'Password is required'
    //   if (Object.keys(this.errors).length > 0) return
    //
    //   // Cari user yang cocok dari data statis
    //   const user = this.staticUsers.find(
    //       u => u.email === this.email && u.password === this.password
    //   )
    //
    //   if (user) {
    //     // Simpan ke localStorage
    //     localStorage.setItem('user', JSON.stringify(user))
    //     // console.log('Login success, user:', user)
    //     console.log('DATA YANG AKAN DISIMPAN:', user)
    //
    //     // Redirect berdasarkan role_id
    //     console.log(user.role_id)
    //     if (user.role_id === 'admin') {
    //       console.log('Login success, role ID:', user.role_id)
    //       this.$router.push('/admin/dashboard')
    //           .then(() => console.log('Redirect sukses ke /admin/dashboard'))
    //           .catch(err => console.error('Redirect gagal:', err))
    //       // this.$router.push('/admin/dashboard')
    //     } else {
    //       this.$router.push('/user/profile')
    //     }
    //   } else {
    //     this.errors.general = 'Email or password is incorrect'
    //     console.error('Login failed')
    //   }
    // }
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        })

        const user = response.data.user

        // Simpan ke localStorage tanpa password
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', response.data.access_token)
        console.log('DATA USER :', user)
        console.log('toke :', response.data.access_token)

        //convert role_id to string
        const roleMap = {
          1: 'admin',
          2: 'user'
        }
        user.role_id = roleMap[user.role_id] || 'guest'
        localStorage.setItem('user', JSON.stringify(user))

        // Redirect berdasarkan role_id yang string
        if (user.role_id === 'admin') {
          this.$router.push('/admin/dashboard')
        } else if (user.role_id === 'user') {
          this.$router.push('/user/profile')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Login gagal:', error.response?.data?.message || error.message)
      }
    }
  }
}
</script>