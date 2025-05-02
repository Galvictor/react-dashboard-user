import React from 'react';
import {useUser} from '../services/UserContext';

export default function Permission({roles = [], userId, children}) {
    const {user, loading} = useUser(); // Usa as informações do contexto

    if (loading) {
        return null; // Retorna vazio enquanto carrega os dados
    }

    if (!user) {
        return null; // Não renderiza nada se o usuário não estiver disponível
    }

    // Verifica se o usuário tem permissão com base no papel (role) ou ID
    const currentRole = user.funcao;
    const currentUserId = user.id;

    console.log('currentRole:', currentRole);

    if (roles.includes(currentRole) || (userId && userId === currentUserId)) {
        return <>{children}</>;
    }

    return null; // Não renderiza se a permissão não for válida
}