<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">User Management</h2>

    <input v-model="search" placeholder="Search user..." class="mb-4 p-2 border rounded w-full" />

    <table class="w-full border">
      <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">#</th>
        <th class="border px-4 py-2">Nama</th>
        <th class="border px-4 py-2">Email</th>
        <th class="border px-4 py-2">Role</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td class="border px-4 py-2">{{ index + 1 }}</td>
        <td class="border px-4 py-2">{{ user.name }}</td>
        <td class="border px-4 py-2">{{ user.email }}</td>
        <td class="border px-4 py-2">{{ user.role.name }}</td>
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
import { ref, onMounted } from 'vue'
import axios from '@/axios' // jika kamu sudah setup global axios

const users = ref([])
onMounted(async () => {
  try {
    const response = await axios.get('/api/user') // Pastikan route ini sesuai Laravel kamu
    users.value = response.data
  } catch (error) {
    console.error('Gagal mengambil data user:', error)
  }
})

export default {
  data() {
    // return {
    //   search: '',
    //   users: [
    //     { name: 'Admin', email: 'admin@example.com' },
    //     { name: 'User A', email: 'a@example.com' }
    //   ]
    // }
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