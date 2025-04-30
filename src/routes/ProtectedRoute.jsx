import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/auth';

export default function ProtectedRoute({ children, roles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  const userRole = getUserRole();
  console.log('userRole', userRole);
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" />; // Redirecionar para um local adequado
  }

  return children;
}