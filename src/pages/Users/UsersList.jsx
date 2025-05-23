import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    Input,
    InputGroup,
    Modal,
    ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import UserTable from '../../components/UserTable';
import UserPagination from '../../components/UserPagination';
import UserModal from '../../components/UserModal';
import Permission from '../../components/Permission.jsx';
import {createUser, deleteUser, getUsers, updateUser} from "../../services/api.js";

export default function UsersList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState({data: [], pagination: {}});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({isOpen: false, user: null, action: null});
    const [newUserId, setNewUserId] = useState(null);

    // Busca usuários da API
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const results = await getUsers(currentPage, 5, searchTerm);
                setUserData(results);
                setError(null);
            } catch (err) {
                setError('Erro ao carregar usuários');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage, searchTerm]);

    const toggleModal = () => setModal({isOpen: !modal.isOpen, user: null, action: null});

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleCreate = () => {
        setModal({isOpen: true, user: null, action: 'create'});
    };

    const handleEdit = (user) => {
        setModal({isOpen: true, user, action: 'edit'});
    };

    const handleDelete = (user) => {
        setModal({isOpen: true, user, action: 'delete'});
    };

    const saveUser = (userData) => {
        if (modal.action === 'create') {
            console.log("Criar usuário:", userData);
            createUser(userData).then((response) => {
                // Lógica para atualizar a lista de usuários

                const newUser = response.data;

                // Atualizar lista de usuários e totais de paginação
                setUserData(prev => ({
                    ...prev,
                    data: [newUser, ...prev.data], // Adiciona o usuário criado como o primeiro item na lista
                    pagination: {
                        ...prev.pagination,
                        totalItems: prev.pagination.totalItems + 1, // Incrementa total de itens
                        totalPages: Math.ceil((prev.pagination.totalItems + 1) / 5) // Recalcula total de páginas
                    }
                }));

                //setCurrentPage(prev => Math.ceil((prev.pagination.totalItems + 1) / 5)); // esta bugando

                setNewUserId(newUser.id);

                // Remove o destaque após 3 segundos
                setTimeout(() => {
                    setNewUserId(null);
                }, 3000);

            }).catch(err => console.error('Erro ao criar usuário:', err));
        } else if (modal.action === 'edit') {
            console.log("Editar usuário:", userData);
            updateUser(modal.user.id, userData).then((response) => {
                // Lógica para atualizar a lista de usuários

                const updatedUser = response.data;

                setUserData(prev => ({
                    ...prev,
                    data: prev.data.map(user => user.id === updatedUser.id ? updatedUser : user)
                }));

            }).catch(err => console.error('Erro ao editar usuário:', err));
        }
        toggleModal();
    };


    const confirmDelete = async () => {
        if (modal.user) {
            console.log("Deletar usuário:", modal.user);

            try {
                await deleteUser(modal.user.id); // Chamar API para deletar o usuário
                setUserData((prev) => ({
                    ...prev,
                    data: prev.data.filter((user) => user.id !== modal.user.id), // Atualizar a lista removendo o usuário deletado
                    pagination: {
                        ...prev.pagination,
                        totalItems: prev.pagination.totalItems - 1, // Atualizar total de itens
                        totalPages: Math.ceil((prev.pagination.totalItems - 1) / 5) // Recalcular total de páginas
                    }
                }));
                console.log("Usuário deletado com sucesso.");
            } catch (err) {
                console.error("Erro ao deletar o usuário:", err);
                setError("Erro ao deletar usuário");
            }
        }
        toggleModal(); // Fechar modal
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
                            <Permission roles={['admin']}>
                                <Button color="primary" onClick={handleCreate}>
                                    <i className="bi bi-plus-circle me-2"/>
                                    Novo Usuário
                                </Button>
                            </Permission>
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
                        <UserTable
                            users={userData.data}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            highlightUserId={newUserId}
                        />
                    )}

                    <UserPagination
                        currentPage={currentPage}
                        totalPages={userData.pagination.totalPages || 1}
                        totalItems={userData.pagination.totalItems || 0}
                        onPageChange={setCurrentPage}
                    />
                </CardBody>
            </Card>

            {/* Modais */}
            {modal.action !== 'delete' ? (
                <UserModal
                    isOpen={modal.isOpen}
                    toggle={toggleModal}
                    onSave={saveUser}
                    userData={modal.user}
                    modalTitle={modal.action === 'edit' ? 'Editar Usuário' : 'Criar Novo Usuário'}
                />
            ) : (
                <Modal isOpen={modal.isOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Confirmar Exclusão</ModalHeader>
                    <ModalBody>
                        Tem certeza que deseja excluir o usuário {modal.user?.nome}?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={confirmDelete}>
                            Excluir
                        </Button>
                        <Button color="secondary" onClick={toggleModal}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </Container>
    );
}