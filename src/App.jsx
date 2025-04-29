import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test.jsx';
import UsersList from './pages/UsersList'; // Importe o novo componente
import {isAuthenticated} from './auth';

const ProtectedRoute = ({children}) => {
    return isAuthenticated() ? children : <Navigate to="/"/>;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="teste" element={<Test/>}/>
                    <Route path="usuarios" element={<UsersList/>}/> {/* Nova rota */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}