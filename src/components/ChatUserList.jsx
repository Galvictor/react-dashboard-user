import {useEffect, useState} from 'react';
import axios from '../services/api';
import {ListGroup, ListGroupItem, Spinner, Container, Row, Col} from 'reactstrap';
import {BsPersonFill} from 'react-icons/bs';

const ChatUserList = ({onUserSelect, onlineUsers}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users/chat-list');
                if (response.data.success) {
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error('Erro ao buscar lista de usuários:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                    className={`d-flex align-items-center justify-content-between user-list-item ${
                        onlineUsers.has(userItem.email) ? 'text-success' : 'text-muted'
                    }`}
                    onClick={() => onUserSelect(userItem.email)}
                    action
                >
                    <Row className="align-items-center w-100">
                        <Col xs="auto">
                            <BsPersonFill size={24} className="text-primary"/>
                        </Col>
                        <Col>
                            <h6 className="mb-0">{userItem.nome}</h6>
                            <small>{onlineUsers.has(userItem.email) ? 'Online' : 'Offline'}</small>
                        </Col>
                    </Row>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default ChatUserList;