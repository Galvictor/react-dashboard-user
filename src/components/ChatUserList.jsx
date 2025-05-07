import {useEffect, useState} from 'react';
import axios from '../services/api'; // Supondo que "api.js" configure o axios para baseURL

const ChatUserList = ({onUserSelect}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users/chat-list');
                console.log('Lista de usuários:', response);
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
        return <p>Carregando lista de usuários...</p>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id} onClick={() => onUserSelect(user.email)}>
                    <strong>{user.nome}</strong> <span>({user.funcao})</span>
                </li>
            ))}
        </ul>
    );
};

export default ChatUserList;