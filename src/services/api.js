import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default {
    getUsers() {
        return instance.get('/users')
    },
    createUser(data) {
        return instance.post('/users', data)
    },
    updateUser(id, data) {
        return instance.put(`/users/${id}`, data)
    },
    deleteUser(id) {
        return instance.delete(`/users/${id}`)
    },
    getRoles() {
        return instance.get('/roles')
    },
    login(data) {
        return instance.post('/login', data)
    },
    logout() {
        return instance.post('/logout')
    }
}