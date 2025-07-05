<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">User Management</h2>

    <input v-model="search" placeholder="Search user..." class="mb-4 p-2 border rounded w-full" />

    <table class="w-full border">
      <thead>
      <tr class="bg-gray-100">
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Email</th>
        <th class="p-2 border">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filteredUsers" :key="user.email">
        <td class="p-2 border">{{ user.name }}</td>
        <td class="p-2 border">{{ user.email }}</td>
        <td class="p-2 border">
          <button class="text-blue-500" @click="editUser(user)">Edit</button> |
          <button class="text-red-500" @click="deleteUser(user.email)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      users: [
        { name: 'Admin', email: 'admin@example.com' },
        { name: 'User A', email: 'a@example.com' }
      ]
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(u => u.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    editUser(user) {
      alert(`Edit ${user.name}`)
    },
    deleteUser(email) {
      this.users = this.users.filter(u => u.email !== email)
    }
  }
}
</script>