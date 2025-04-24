//import axios from 'axios';

export const login = async (username, password) => {
    try {
        // Simulação (hardcoded), mas estrutura pronta pra API
        if (username === 'admin' && password === '123456') {
            sessionStorage.setItem('auth', 'true');
            return true;
        }

        // Exemplo para uso real no futuro:
        /*
        const response = await axios.post('https://sua-api.com/login', {
          username,
          password
        });
        sessionStorage.setItem('token', response.data.token);
        return true;
        */

        return false;
    } catch (error) {
        console.error('Erro ao logar:', error);
        return false;
    }
};

export const isAuthenticated = () => {
    return sessionStorage.getItem('auth') === 'true';
};

export const logout = () => {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token'); // se usar token no futuro
};
