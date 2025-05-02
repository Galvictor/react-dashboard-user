import axios from 'axios';
import {getUserProfile, loginUser} from "./api.js";

// Criando uma variável para armazenar a função de navegação
let navigate;

let user = null;

// Caching da role para evitar múltiplas chamadas desnecessárias
let roleCache = null;

// Cria uma função para notificar o contexto sobre o logout
let onLogoutCallback = null;

export const setOnLogoutCallback = (callback) => {
    onLogoutCallback = callback;
};

// Função para configurar o navigate
export const setNavigate = (navigateFunc) => {
    navigate = navigateFunc;
};


// Configurando axios para incluir o token em todas as requisições
axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email, password) => {
    try {
        const response = await loginUser(email, password);
        if (response.success) {
            user = response.user;
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            sessionStorage.setItem('auth', 'true');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Erro ao logar:', error);
        return false; // Alterado para retornar false ao invés de throw error
    }
};

export const isAuthenticated = () => {
    if (!user) {
        const savedUser = sessionStorage.getItem('user');
        if (savedUser) {
            user = JSON.parse(savedUser);
        }
    }


    return sessionStorage.getItem('auth') === 'true' && !!sessionStorage.getItem('token');
};

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
    return sessionStorage.getItem('token');
};

export async function getUserRole() {
    if (roleCache) {
        return roleCache; // Retorna a role do cache se já estiver definida
    }

    try {
        const userProfile = await getUserProfile(); // Chama o backend para buscar o perfil
        if (!userProfile.success || !userProfile.data) {
            throw new Error('Resposta inválida do backend');
        }

        roleCache = userProfile.data.funcao || null; // Armazena o papel (função) no cache
        return roleCache;
    } catch (error) {
        console.error('Erro ao buscar a função do usuário:', error);
        roleCache = null; // Limpa o cache em caso de erro
        return null; // Em caso de erro, retorna null
    }
}


export function getUserId() {
    return user?.id || null; // Retorna ID do usuário
}


export const logout = () => {
    user = null;
    roleCache = null; // Limpa o cache da função do usuário
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Notifica o contexto para resetar o estado
    if (onLogoutCallback) {
        onLogoutCallback();
    }

};

// Configurando interceptor para tratar erros de autenticação
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            logout();
            if (navigate) {
                navigate('/');
            }
        }
        return Promise.reject(error);
    }
);
