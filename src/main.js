import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // jika pakai router

const app = createApp(App)

app.use(router) // aktifkan routing jika ada
app.mount('#app')