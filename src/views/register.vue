<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Name</label>
          <input
              v-model="name"
              type="text"
              placeholder="Enter your name"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Confirm Password</label>
          <input
              v-model="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
        </div>

        <button
            type="submit"
            class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  },
  methods: {
    register() {
      this.errors = {}

      if (!this.name) {
        this.errors.name = 'Name is required'
      }

      if (!this.email) {
        this.errors.email = 'Email is required'
      } else if (!this.validEmail(this.email)) {
        this.errors.email = 'Email is invalid'
      }

      if (!this.password) {
        this.errors.password = 'Password is required'
      } else if (this.password.length < 4) {
        this.errors.password = 'Password must be at least 4 characters'
      }

      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Confirmation is required'
      } else if (this.confirmPassword !== this.password) {
        this.errors.confirmPassword = 'Passwords do not match'
      }

      if (Object.keys(this.errors).length === 0) {
        console.log('Register success:', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        // Lanjut ke backend di sini
      }
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
  }
}
</script>