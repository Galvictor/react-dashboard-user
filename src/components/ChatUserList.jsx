import {useEffect, useState} from 'react';
import axios from '../services/api';
import {useUser} from '../services/UserContext';
import {
    ListGroup,
    ListGroupItem,
    Spinner,
    Container,
    Row,
    Col,
} from 'reactstrap';
import {BsPersonFill} from 'react-icons/bs';

const ChatUserList = ({onUserSelect}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useUser(); // Obtemos o usuário autenticado pelo contexto

    useEffect(() => {
        if (!user?.email) return;

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users/chat-list');
                if (response.data.success) {
                    // Remove o usuário logado da lista
                    setUsers(response.data.data.filter((u) => u.email !== user.email));
                }
            } catch (error) {
                console.error('Erro ao buscar lista de usuários:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [user?.email]);

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner color="primary"/>
                <p>Carregando lista de usuários...</p>
            </Container>
        );
    }

    if (!users.length) {
        return <p className="text-center text-muted">Nenhum usuário disponível</p>;
    }

    return (
        <ListGroup flush className="shadow-sm">
            {users.map((userItem) => (
                <ListGroupItem
                    key={userItem.id}
                    className="d-flex align-items-center justify-content-between user-list-item"
                    onClick={() => onUserSelect(userItem.email)}
                    action
                >
                    <Row className="align-items-center w-100">
                        <Col xs="auto">
                            <BsPersonFill size={24} className="text-primary"/>
                        </Col>
                        <Col>
                            <h6 className="mb-0">{userItem.nome}</h6>
                            <small className="text-muted">{userItem.funcao}</small>
                        </Col>
                    </Row>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default ChatUserList;