<template>
  <div class="p-6">
    <h1 class="text-xl font-semibold">Welcome, {{ user.name }}</h1>
    <p>Role: {{ user.role }}</p>

    <p v-if="user.permissions && user.permissions.length > 0">
      Permissions: {{ user.permissions.join(', ') }}
    </p>
    <p v-else>
      Permissions: <span class="text-gray-400 italic">None</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {}
    }
  }
}
</script>