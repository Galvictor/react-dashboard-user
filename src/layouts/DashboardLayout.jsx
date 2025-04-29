import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../auth';
import './DashboardLayout.scss';

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard-layout d-flex">
            {/* Sidebar */}
            <aside className="sidebar d-flex flex-column p-3">
                <h5 className="text-white mb-4">Painel</h5>
                <nav className="nav flex-column mb-auto">
                    <Link to="/dashboard/usuarios" className="nav-link text-white">
                        <i className="bi bi-people-fill me-2" />
                        Usuários
                    </Link>
                    <Link to="/dashboard/teste" className="nav-link text-white">
                        <i className="bi bi-speedometer2 me-2" />
                        Rota de Teste
                    </Link>
                </nav>
                <button onClick={handleLogout} className="btn btn-outline-light mt-auto">
                    <i className="bi bi-box-arrow-right me-2" />
                    Sair
                </button>
            </aside>

            {/* Conteúdo */}
            <main className="content p-4 w-100">
                <Outlet />
            </main>
        </div>
    );
}