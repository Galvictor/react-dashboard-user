import axios from 'axios';
import {getToken} from './auth';

// Configurações base do axios
const api = axios.create({
    baseURL: 'http://localhost:3000', // Defina a URL base da sua API
});

// Adiciona o token de autenticação para todas as requisições
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Funções de chamadas à API
 */

// Login do usuário
export const loginUser = async (email, password) => {
    const response = await api.post('/users/login', {email, password});
    return response.data;
};

// Buscar lista de usuários (com paginação e termo de busca)
export const getUsers = async (page = 1, limit = 5, searchTerm = '') => {
    const response = await api.get('/users', {
        params: {page, limit, search: searchTerm},
    });
    return response.data;
};

// Buscar perfil do usuário autenticado
export const getUserProfile = async () => {
    const response = await api.get('/users/me');
    return response.data;
};

// Buscar um usuário específico por ID
export const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

// Criar um novo usuário
export const createUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

// Atualizar dados de um usuário
export const updateUser = async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
};

// Atualizar dados do próprio usuário
export const updateOwnAccount = async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
};

// Deletar um usuário
export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};

// Deletar a conta do próprio usuário
export const deleteOwnAccount = async () => {
    const response = await api.delete('/users/me');
    return response.data;
};

export default api;