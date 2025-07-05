<!-- src/views/admin/AdminLayout.vue -->
<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 bg-gray-100 p-6">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>