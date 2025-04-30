import axios from 'axios';

// Criando uma variável para armazenar a função de navegação
let navigate;

let user = null;

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
        const response = await axios.post('http://localhost:3000/users/login', {
            email,
            password
        });

        if (response.data.success) {
            user = response.data.user;
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
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

export function getUserRole() {
    return user?.funcao || null; // Retorna função do usuário
}

export function getUserId() {
    return user?.id || null; // Retorna ID do usuário
}


export const logout = () => {
    user = null;
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
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
