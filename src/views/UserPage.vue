<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Welcome, {{ user.name }}</h1>
    <p class="text-gray-700 mt-2">Role: {{ user.role }}</p>
    <p class="text-gray-700">Permissions: {{ user.permissions.join(', ') }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('authUser') || '{}')
    }
  }
}
</script>