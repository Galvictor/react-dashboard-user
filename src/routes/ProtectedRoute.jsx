import React from 'react';
import {Navigate} from 'react-router-dom';
import {useUser} from '../services/UserContext';

export default function ProtectedRoute({children, roles}) {
    const {user, loading} = useUser(); // Usa o contexto para pegar os dados do usuário

    if (loading) {
        return <p>Carregando...</p>; // Exibe mensagem de carregamento
    }

    if (!user) {
        return <Navigate to="/" replace/>; // Redireciona para login se o usuário não existir
    }

    // Verifica se o papel do usuário está permitido para acessar a rota
    if (roles && !roles.includes(user.funcao)) {
        return <Navigate to="/dashboard" replace/>; // Redireciona se não tiver permissão
    }

    return children;
}