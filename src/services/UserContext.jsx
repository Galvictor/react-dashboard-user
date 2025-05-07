import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {getUserProfile} from './api.js';
import {setOnLogoutCallback} from './auth';

const UserContext = createContext();

export function UserProvider({children}) {
    const [user, setUser] = useState(null); // Estado do usuário
    const [loading, setLoading] = useState(true); // Controle de carregamento

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const profile = await getUserProfile();
            if (profile.success && profile.data) {
                setUser(profile.data); // Atualiza o estado global com os dados do usuário
            } else {
                setUser(null); // Nenhuma informação do usuário
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            setUser(null); // Limpa o estado em caso de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    }, []);

    useEffect(() => {
        // Busca os dados do usuário ao carregar o provedor
        fetchUserData();

        // Define um callback para resetar o estado global no logout
        setOnLogoutCallback(() => {
            setUser(null);  // Reseta os dados do contexto
            setLoading(false); // Encerra o carregamento
        });
    }, [fetchUserData]);

    // Permite que o usuário seja definido manualmente (após login)
    const setUserManual = (newUser) => {
        setUser(newUser);
        setLoading(false);
    };

    return (
        <UserContext.Provider value={{user, loading, fetchUserData, setUserManual}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}