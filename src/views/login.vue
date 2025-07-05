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

const staticUsers = [
  {
    email: 'admin@example.com',
    password: 'asdf',
    name: 'Admin User',
    role: 'admin',
    permissions: ['create_user', 'delete_user', 'edit_role', 'manage_permission']
  },
  {
    email: 'user@example.com',
    password: 'asdf',
    name: 'Normal User',
    role: 'user',
    permissions: ['view_profile']
  }
]

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      // Data statis sementara
      // users: [
      //   { email: 'admin@mail.com', password: 'admin123', role: 'admin' },
      //   { email: 'user@mail.com', password: 'user123', role: 'user' }
      // ]
    }
  },
  methods: {
    login() {
      this.errors = {}

      // Validasi input
      if (!this.email) this.errors.email = 'Email is required'
      else if (!this.validEmail(this.email)) this.errors.email = 'Email is invalid'

      if (!this.password) this.errors.password = 'Password is required'
      else if (this.password.length < 4) this.errors.password = 'Password must be at least 4 characters'

      if (Object.keys(this.errors).length === 0) {
        const user = staticUsers.find(u => u.email === this.email && u.password === this.password)

        if (user) {
          localStorage.setItem('authUser', JSON.stringify(user))
          if (user.role === 'admin') {
            this.$router.push('/admin/dashboard')
          } else {
            this.$router.push('/user/dashboard')
          }
        } else {
          this.errors.email = 'Email or password is incorrect'
        }
      }
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
  }
}
</script>