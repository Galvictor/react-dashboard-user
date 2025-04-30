import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {getUserProfile, deleteOwnAccount, updateOwnAccount} from '../../services/api';
import {logout} from '../../services/auth';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        telefone: '',
        email: '',
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal
    const navigate = useNavigate();

    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen); // Função para alternar o modal

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile();
                setUser(data.data);
                setFormData({
                    nome: data.data.nome,
                    dataNascimento: data.data.dataNascimento,
                    telefone: data.data.telefone,
                    email: data.data.email,
                });
            } catch (err) {
                setError('Erro ao carregar o perfil!');
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateOwnAccount(formData);
            setSuccess('Perfil atualizado com sucesso!');
            setEditMode(false);

            const updatedUser = {
                ...user,
                ...formData,
            };
            setUser(updatedUser);
        } catch (err) {
            setError('Erro ao atualizar o perfil!');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteOwnAccount();
            logout();
            navigate('/');
        } catch (err) {
            setError('Erro ao deletar a conta!');
        }
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <Container className="mt-4">
            <Card className="p-4">
                <h2 className="mb-4">Meu Perfil</h2>

                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}

                {editMode ? (
                    <Form onSubmit={handleUpdate}>
                        <FormGroup className="mb-3">
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label>Data de Nascimento</Label>
                            <Input
                                type="date"
                                name="dataNascimento"
                                value={formData.dataNascimento}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label>Telefone</Label>
                            <Input
                                type="text"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <Button color="primary" type="submit" className="me-2">
                            Salvar
                        </Button>
                        <Button color="secondary" onClick={() => setEditMode(false)}>
                            Cancelar
                        </Button>
                    </Form>
                ) : (
                    <div>
                        <p>
                            <strong>Nome:</strong> {user.nome}
                        </p>
                        <p>
                            <strong>Data de Nascimento:</strong> {new Date(
                            user.dataNascimento
                        ).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Telefone:</strong> {user.telefone}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Função:</strong> {user.funcao}
                        </p>
                        <p>
                            <strong>Criado em:</strong> {new Date(
                            user.criadoEm
                        ).toLocaleDateString()}
                        </p>

                        <Button color="primary" onClick={() => setEditMode(true)} className="me-2">
                            Editar Perfil
                        </Button>
                        <Button color="danger" onClick={toggleDeleteModal}>
                            Deletar Conta
                        </Button>
                    </div>
                )}
            </Card>

            {/* Modal de Confirmação de Deleção */}
            <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>Confirmar Exclusão</ModalHeader>
                <ModalBody>Tem certeza que deseja deletar sua conta?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteAccount}>
                        Deletar
                    </Button>
                    <Button color="secondary" onClick={toggleDeleteModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default Profile;