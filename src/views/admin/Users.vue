<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">User Management</h2>

    <!-- Search -->
    <input
        type="text"
        v-model="search"
        placeholder="Search user..."
        class="border px-2 py-1 mb-4 w-full max-w-xs rounded"
    />

    <!-- Tambah User Button -->
    <button
        @click="openAddModal"
        class="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      + Tambah User
    </button>

    <!-- Tabel User -->
    <table class="table-auto w-full border-collapse border">
      <thead class="bg-gray-100">
      <tr>
        <th class="border px-4 py-2">#</th>
        <th class="border px-4 py-2">Nama</th>
        <th class="border px-4 py-2">Email</th>
        <th class="border px-4 py-2">Role</th>
        <th class="border px-4 py-2">Aksi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in filteredUsers" :key="user.id">
        <td class="border px-4 py-2">{{ index + 1 }}</td>
        <td class="border px-4 py-2">{{ user.name }}</td>
        <td class="border px-4 py-2">{{ user.email }}</td>
        <td class="border px-4 py-2">{{ user.role?.name_role }}</td>
        <td class="border px-4 py-2 space-x-2">
          <button @click="openEditModal(user)" class="text-blue-500 hover:underline">Edit</button>
          <button @click="openDeleteModal(user.id)" class="text-red-500 hover:underline">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal Edit -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Edit User</h3>
        <input v-model="selectedUser.name" placeholder="Nama" class="border px-3 py-2 mb-3 w-full rounded" />
        <input v-model="selectedUser.email" placeholder="Email" class="border px-3 py-2 mb-3 w-full rounded" />
        <div class="flex justify-end space-x-2">
          <button @click="updateUser" class="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
          <button @click="closeEditModal" class="bg-gray-300 px-4 py-2 rounded">Batal</button>
        </div>
      </div>
    </div>

    <!-- Modal Tambah User -->
    <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Tambah User</h3>
        <input
            v-model="newUser.name"
            placeholder="Nama"
            class="border px-3 py-2 mb-3 w-full rounded"
        />
        <input
            v-model="newUser.email"
            placeholder="Email"
            class="border px-3 py-2 mb-3 w-full rounded"
        />
        <input
            v-model="newUser.password"
            type="password"
            placeholder="Password"
            class="border px-3 py-2 mb-3 w-full rounded"
        />
        <select
            v-model.number="newUser.role_id"
            class="w-full border rounded px-2 py-1 mt-2"
        >
          <option disabled value="">Pilih Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name_role }}
          </option>
        </select>
        <div class="flex justify-end space-x-2">
          <button @click="createUser" class="bg-green-500 text-white px-4 py-2 rounded">Simpan</button>
          <button @click="closeAddModal" class="bg-gray-300 px-4 py-2 rounded">Batal</button>
        </div>
      </div>
    </div>

    <!-- Modal Delete -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
        <p class="text-lg mb-4">Yakin ingin menghapus user ini?</p>
        <div class="flex justify-center gap-4">
          <button @click="confirmDeleteUser" class="bg-red-500 text-white px-4 py-2 rounded">Ya</button>
          <button @click="closeDeleteModal" class="bg-gray-300 px-4 py-2 rounded">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const users = ref([])
const search = ref('')
const selectedUser = ref(null)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const userIdToDelete = ref(null)

async function fetchUsers() {
  try {
    const res = await api.getUsers()
    users.value = res.data
  } catch (err) {
    console.error('Gagal ambil user:', err)
  }
}

onMounted(fetchUsers)

const filteredUsers = computed(() =>
    users.value.filter(user =>
        user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase()) ||
        user.role?.name_role?.toLowerCase().includes(search.value.toLowerCase())
    )
)

function openEditModal(user) {
  selectedUser.value = { ...user }
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  selectedUser.value = null
}

async function updateUser() {
  try {
    await api.updateUser(selectedUser.value.id, {
      name: selectedUser.value.name,
      email: selectedUser.value.email
    })
    fetchUsers()
    closeEditModal()
  } catch (err) {
    console.error('Gagal update:', err)
  }
}

function openDeleteModal(id) {
  userIdToDelete.value = id
  showDeleteModal.value = true
}

function closeDeleteModal() {
  userIdToDelete.value = null
  showDeleteModal.value = false
}

async function confirmDeleteUser() {
  try {
    await api.deleteUser(userIdToDelete.value)
    fetchUsers()
    closeDeleteModal()
  } catch (err) {
    console.error('Gagal hapus:', err)
  }
}

const showAddModal = ref(false)
const newUser = ref({
  name: '',
  email: '',
  password: '',
  role_id: ''
})
const roles = ref([])

function openAddModal() {
  showAddModal.value = true
  newUser.value = { name: '', email: '', password: '', role_id: '' }
  fetchRoles()
}
function closeAddModal() {
  showAddModal.value = false
}

async function createUser() {
  try {
    // Validasi sederhana
    if (!newUser.value.name || !newUser.value.email || !newUser.value.password || !newUser.value.role_id) {
      alert('Semua field wajib diisi!');
      return;
    }

    const payload = {
      name: newUser.value.name,
      email: newUser.value.email,
      password: newUser.value.password,
      role_id: newUser.value.role_id,
    }

    await api.createUser(payload)

    await fetchUsers()
    closeAddModal()
  } catch (err) {
    console.error('Gagal tambah user:', err)
    alert('Gagal tambah user. Silakan cek console.')
  }
}

async function fetchRoles() {
  try {
    const res = await api.getRoles()
    roles.value = res.data
    console.log('[ROLES]', res.data)
  } catch (err) {
    console.error('Gagal ambil role:', err)
  }
}
</script>