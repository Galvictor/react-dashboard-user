import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Card, CardHeader, CardBody, Row, Col, Button, Input, InputGroup} from 'reactstrap';
import UserTable from '../../components/UserTable';
import UserPagination from '../../components/UserPagination';
import {handleApiError} from '../../utils/formatters';

export default function UsersList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState({data: [], pagination: {}});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/users', {
                    params: {page: currentPage, limit: 5},
                });
                setUserData(response.data);
                setError(null);
            } catch (err) {
                setError(handleApiError(err));
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    return (
        <Container>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md={6}>
                            <h4>Usuários</h4>
                        </Col>
                        <Col md={6} className="text-end">
                            <Button color="primary">
                                <i className="bi bi-plus-circle me-2"/>
                                Novo Usuário
                            </Button>
                        </Col>
                    </Row>
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
                                    />
                                    <Button color="secondary" type="submit">
                                        <i className="bi bi-search"/>
                                    </Button>
                                </InputGroup>
                            </form>
                        </Col>
                    </Row>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {loading ? (
                        <div className="spinner-border text-primary"/>
                    ) : (
                        <UserTable users={userData.data}/>
                    )}

                    <UserPagination
                        currentPage={currentPage}
                        totalPages={userData.pagination.totalPages || 1}
                        onPageChange={setCurrentPage}
                    />
                </CardBody>
            </Card>
        </Container>
    );
}