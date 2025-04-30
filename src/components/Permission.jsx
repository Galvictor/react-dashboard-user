import React from 'react';
import {getUserRole, getUserId} from '../services/auth';

export default function Permission({roles, userId, children}) {
    const currentRole = getUserRole();
    const currentUserId = getUserId();

    if (roles.includes(currentRole)) {
        return <>{children}</>;
    }

    if (userId && userId === currentUserId) {
        return <>{children}</>;
    }

    return null; // Não renderiza nada se a permissão não for adequada
}