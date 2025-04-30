import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import UsersList from './pages/Users/UsersList.jsx'; // Importe o novo componente
import {isAuthenticated} from './services/auth.jsx';
import Profile from "./pages/Profile/Profile.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";

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
                    <Route index element={<DashboardHome/>}/>
                    <Route path="usuarios" element={<UsersList/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}