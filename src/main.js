import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // jika pakai router
import axios from 'axios'

const app = createApp(App)

app.use(router) // aktifkan routing jika ada
app.mount('#app')

//token get
const token = localStorage.getItem('token')

// Jika token ada, tambahkan ke header default
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}