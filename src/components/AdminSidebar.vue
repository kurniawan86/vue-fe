<template>
  <div class="flex flex-col justify-between h-screen p-4 bg-white shadow-lg w-64">
    <!-- Menu Navigasi -->
    <div>
      <h2 class="font-bold text-lg mb-4">Admin Panel</h2>
      <ul>
        <li><router-link to="/admin/dashboard" class="text-blue-600">Dashboard</router-link></li>
        <li><router-link to="/admin/users" class="text-blue-600">User Management</router-link></li>
        <li><router-link to="/admin/roles" class="text-blue-600">Role Management</router-link></li>
      </ul>
    </div>

    <!-- Tombol Logout -->
    <div class="mt-4">
      <button
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Logout
      </button>
    </div>
  </div>
</template>


<script setup>
import api from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleLogout() {
  try {
    await logoutUser()

    // Hapus dari localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    // Redirect ke halaman login
    router.push('/login')
  } catch (err) {
    console.error('Logout gagal:', err)
  }
}
</script>