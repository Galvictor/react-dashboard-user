import React from 'react';
import {Container} from 'reactstrap';

export default function DashboardHome() {
    return (
        <Container fluid>
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="display-4 mb-4">Bem-vindo ao Painel de Controle</h1>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <i className="bi bi-house-door text-primary" style={{fontSize: '4rem'}}></i>
                            <h2 className="card-title mt-3">Área Administrativa</h2>
                            <p className="card-text">
                                Aqui você pode gerenciar usuários e acessar todas as funcionalidades do sistema.
                                Use o menu lateral para navegar entre as diferentes seções.
                            </p>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <i className="bi bi-people-fill text-primary mb-3"
                                               style={{fontSize: '2rem'}}></i>
                                            <h5>Usuários</h5>
                                            <p className="small">Gerencie os usuários do sistema</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <i className="bi bi-person-circle text-primary mb-3"
                                               style={{fontSize: '2rem'}}></i>
                                            <h5>Seu Perfil</h5>
                                            <p className="small">Gerencie suas informações</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}