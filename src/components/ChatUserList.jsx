import {useEffect, useState} from 'react';
import axios from '../services/api';
import {useUser} from '../services/UserContext';

const ChatUserList = ({onUserSelect}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useUser(); // Obtemos o usuário autenticado pelo contexto

    useEffect(() => {
        if (!user?.email) return; // só executa quando user.email estiver disponíve

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
        return <p>Carregando lista de usuários...</p>;
    }

    return (
        <ul>
            {users.map((userItem) => (
                <li key={userItem.id} onClick={() => onUserSelect(userItem.email)}>
                    <strong>{userItem.nome}</strong> <span>({userItem.funcao})</span>
                </li>
            ))}
        </ul>
    );
};

export default ChatUserList;