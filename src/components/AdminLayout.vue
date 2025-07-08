<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar class="w-64 bg-white shadow-lg" />

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <router-view />
    </div>

  </div>
</template>

<script>
import AdminSidebar from '../components/AdminSidebar.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('ini di halaman admin layout cek user_id : ', user.role_id)
    if (!user || user.role_id !== '1') {
      this.$router.push('/') // redirect ke login jika bukan admin
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

<style scoped>
/* Tambahkan styling tambahan jika perlu */
</style>