<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-blue-500 text-white p-4 rounded shadow">Total Users: {{ totalUsers }}</div>
      <div class="bg-green-500 text-white p-4 rounded shadow">Total Roles: {{ totalRoles }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalUsers: 12,
      totalRoles: 3
    }
  }
}
</script>