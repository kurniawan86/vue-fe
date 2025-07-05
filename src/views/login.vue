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
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      // 🔒 Data user sementara
      staticUsers: [
        {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
          permissions: ['manage_users', 'view_dashboard']
        },
        {
          email: 'user@example.com',
          password: 'user123',
          name: 'Normal User',
          role: 'user',
          permissions: ['view_profile']
        }
      ]
    }
  },
  methods: {
    login() {
      this.errors = {}

      if (!this.email) {
        this.errors.email = 'Email is required'
      }

      if (!this.password) {
        this.errors.password = 'Password is required'
      }

      if (Object.keys(this.errors).length > 0) return

      // ✅ Cek user statis
      const foundUser = this.staticUsers.find(
          (user) => user.email === this.email && user.password === this.password
      )

      if (!foundUser) {
        this.errors.general = 'Email or password is incorrect'
        return
      }

      // ✅ Simpan user ke localStorage (nanti bisa diganti dengan token)
      localStorage.setItem('user', JSON.stringify(foundUser))
      console.log('Logged in as:', foundUser) // pastikan user.role benar

      // ✅ Redirect berdasarkan role
      if (foundUser.role === 'admin') {
        this.$router.push('/admin/dashboard')
      } else if (foundUser.role === 'user') {
        this.$router.push('/user/profile')
      }
    }
  }
}
</script>