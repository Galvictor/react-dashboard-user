import React, {useState, useEffect} from 'react';
import axios from 'axios';
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
    const [userData, setUserData] = useState({
        success: true,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
        },
        data: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/users', {
                    params: {
                        page: currentPage,
                        search: searchTerm
                    }
                });
                setUserData(response.data);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar usuários:', err);
                setError('Erro ao carregar usuários. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage, searchTerm]);

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

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reseta para primeira página ao pesquisar
    };

    const renderPaginationItems = () => {
        const items = [];
        const {totalPages} = userData.pagination;

        items.push(
            <PaginationItem key="prev" disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)}/>
            </PaginationItem>
        );

        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={i} active={currentPage === i}>
                    <PaginationLink onClick={() => setCurrentPage(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        items.push(
            <PaginationItem key="next" disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)}/>
            </PaginationItem>
        );

        return items;
    };

    if (error) {
        return (
            <Container fluid className="users-list">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </Container>
        );
    }

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
                            <form onSubmit={handleSearch}>
                                <InputGroup>
                                    <Input
                                        placeholder="Pesquisar usuários..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                    <Button color="secondary" type="submit">
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col md={6} className="d-flex align-items-center justify-content-end">
                            <small className="text-muted">
                                Total: {userData.pagination.totalItems} usuários
                            </small>
                        </Col>
                    </Row>

                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center p-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        ) : (
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
                                {userData.data.map((user) => (
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
                        )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <Pagination className="mb-0">
                            {renderPaginationItems()}
                        </Pagination>
                        <div className="text-muted">
                            Página {currentPage} de {userData.pagination.totalPages}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}