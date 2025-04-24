import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test.jsx';
import {isAuthenticated} from './auth';

// Componente de proteção de rota
const ProtectedRoute = ({children}) => {
    return isAuthenticated() ? children : <Navigate to="/"/>;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota pública */}
                <Route path="/" element={<Login/>}/>

                {/* Rota protegida */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                >
                    {/* Subrotas do dashboard */}
                    <Route path="teste" element={<Test/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
