<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <ul class="list-disc ml-5">
      <li><router-link to="/admin/users">Manage Users</router-link></li>
      <li><router-link to="/admin/roles">Manage Roles</router-link></li>
      <li><router-link to="/admin/permissions">Manage Permissions</router-link></li>
    </ul>
  </div>
</template>