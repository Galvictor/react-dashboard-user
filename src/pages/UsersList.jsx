import React, {useState} from 'react';
import {
    Container,
    Table,
    Badge,
    Card,
    CardHeader,
    CardBody,
    Button,
    Input,
    InputGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Col
} from 'reactstrap';
import './UsersList.scss';

export default function UsersList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Dados mockados com o novo formato
    const mockResponse = {
        success: true,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 4
        },
        data: [
            {
                "id": "1",
                "nome": "Ana Silva",
                "dataNascimento": "1990-05-15",
                "telefone": "(11) 98765-4321",
                "email": "ana.silva@email.com",
                "funcao": "admin",
                "criadoEm": "2023-01-10T09:30:00Z"
            },
            {
                "id": "2",
                "nome": "Carlos Oliveira",
                "dataNascimento": "1985-08-22",
                "telefone": "(21) 99876-5432",
                "email": "carlos.oliveira@email.com",
                "funcao": "professor",
                "criadoEm": "2023-01-11T10:15:00Z"
            },
            {
                "id": "3",
                "nome": "Mariana Santos",
                "dataNascimento": "1998-03-30",
                "telefone": "(31) 99123-4567",
                "email": "mariana.s@email.com",
                "funcao": "aluno",
                "criadoEm": "2023-02-05T14:20:00Z",
                "atualizadoEm": "2023-02-05T14:20:00Z"
            },
            {
                "id": "4",
                "nome": "Pedro Henrique",
                "dataNascimento": "2000-11-18",
                "telefone": "(48) 99234-5678",
                "email": "pedro.h@email.com",
                "funcao": "aluno",
                "criadoEm": "2023-02-15T08:45:00Z",
                "atualizadoEm": "2023-02-05T14:20:00Z"
            }
        ]
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getFuncaoColor = (funcao) => {
        const colors = {
            admin: 'danger',
            professor: 'success',
            aluno: 'info'
        };
        return colors[funcao] || 'secondary';
    };

    // Função para gerar os items da paginação
    const renderPaginationItems = () => {
        const items = [];
        const {totalPages} = mockResponse.pagination;

        // Botão Previous
        items.push(
            <PaginationItem key="prev" disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)}/>
            </PaginationItem>
        );

        // Números das páginas
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={i} active={currentPage === i}>
                    <PaginationLink onClick={() => setCurrentPage(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Botão Next
        items.push(
            <PaginationItem key="next" disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)}/>
            </PaginationItem>
        );

        return items;
    };

    return (
        <Container fluid className="users-list">
            <Card className="shadow-sm">
                <CardHeader className="bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                            <i className="bi bi-people-fill me-2"></i>
                            Usuários
                        </h4>
                        <Button color="primary" size="sm">
                            <i className="bi bi-plus-circle me-1"></i>
                            Novo Usuário
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="mb-3">
                        <Col md={6}>
                            <InputGroup>
                                <Input
                                    placeholder="Pesquisar usuários..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                                <Button color="secondary">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col md={6} className="d-flex align-items-center justify-content-end">
                            <small className="text-muted">
                                Total: {mockResponse.pagination.totalItems} usuários
                            </small>
                        </Col>
                    </Row>

                    <div className="table-responsive">
                        <Table hover className="align-middle">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Data Nasc.</th>
                                <th>Função</th>
                                <th>Criado em</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mockResponse.data.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.telefone}</td>
                                    <td>{formatDate(user.dataNascimento)}</td>
                                    <td>
                                        <Badge color={getFuncaoColor(user.funcao)} pill>
                                            {user.funcao}
                                        </Badge>
                                    </td>
                                    <td>{formatDate(user.criadoEm)}</td>
                                    <td>
                                        <Button color="link" className="btn-action" title="Editar">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button color="link" className="btn-action text-danger" title="Excluir">
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <Pagination className="mb-0">
                            {renderPaginationItems()}
                        </Pagination>
                        <div className="text-muted">
                            Página {currentPage} de {mockResponse.pagination.totalPages}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}