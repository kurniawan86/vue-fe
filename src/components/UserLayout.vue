<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Optional Sidebar -->
    <div class="w-64 bg-white shadow-md">
      <p class="p-4 font-bold">User Panel</p>
      <router-link to="/user/profile" class="block p-2 hover:bg-gray-200">My Profile</router-link>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <div class="flex justify-end p-4">
        <button @click="logout"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 2) {
      this.$router.push('/')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>