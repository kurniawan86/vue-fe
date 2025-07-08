// src/axios.js
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', // sesuaikan dengan URL backend Laravel
})

// Ambil token dari localStorage dan set ke header jika ada
const token = localStorage.getItem('token')
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance