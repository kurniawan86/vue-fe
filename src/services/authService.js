// src/services/authService.js
import api from './api'

export const login = async (credentials) => {
    const response = await api.post('/login', credentials)
    return response.data
}

export const logout = async () => {
    const response = await api.post('/logout')
    return response.data
}

export const getAuthenticatedUser = async () => {
    const response = await api.get('/user')
    return response.data
}

