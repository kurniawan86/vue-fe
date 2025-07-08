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
import AdminSidebar from "../../components/AdminSidebar.vue"


export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar
  },
  created() {
    console.log('[Dashboard] Komponen AdminLayout berhasil dimuat')
    const user = JSON.parse(localStorage.getItem('user'))

    console.log('DARI localStorage:', user)
    console.log('ROLE USER_ID:', user?.role_id)

    if (!user || parseInt(user.role_id) !== 'admin') {
      // console.log('masuk pengujian !user || user.role_id !== 1 ')
      console.log('Redirect karena bukan admin')
      this.$router.push('/') // redirect ke login jika bukan admin
    }
  }
}
</script>

<style scoped>
/* Tambahkan styling tambahan jika perlu */
</style>