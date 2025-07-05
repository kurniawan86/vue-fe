<template>
  <div class="w-64 bg-gray-800 text-white min-h-screen">
    <div class="p-4 font-bold text-xl border-b border-gray-600">Admin Panel</div>
    <ul class="mt-4">
      <li>
        <router-link to="/admin/dashboard" class="block p-3 hover:bg-gray-700">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/admin/users" class="block p-3 hover:bg-gray-700">Users</router-link>
      </li>
    </ul>
  </div>
</template>