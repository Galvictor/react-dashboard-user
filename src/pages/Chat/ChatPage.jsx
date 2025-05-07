import {useState} from 'react';
import ChatUserList from '../../components/ChatUserList';
import ChatRoom from '../../components/ChatRoom';
import {useUser} from '../../services/UserContext';

const ChatPage = () => {
    const {user} = useUser(); // Obtendo as informações do usuário logado
    const [selectedUser, setSelectedUser] = useState(null);

    if (!user) {
        return <p>Carregando dados do usuário...</p>;
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '30%'}}>
                <h3>Usuários Disponíveis</h3>
                <ChatUserList onUserSelect={(email) => setSelectedUser(email)}/>
            </div>
            <div style={{width: '70%'}}>
                {selectedUser ? (
                    <ChatRoom selectedUser={selectedUser}/>
                ) : (
                    <p>Selecione um usuário para iniciar o chat</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;