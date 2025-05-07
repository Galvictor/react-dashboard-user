import {useState} from 'react';
import ChatUserList from '../../components/ChatUserList';
import ChatRoom from '../../components/ChatRoom';

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const userEmail = 'seu.email@dominio.com'; // Troque isso para obter o email do usuário logado

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '30%'}}>
                <h3>Usuários Disponíveis</h3>
                <ChatUserList onUserSelect={(email) => setSelectedUser(email)}/>
            </div>
            <div style={{width: '70%'}}>
                {selectedUser ? (
                    <ChatRoom userEmail={userEmail} selectedUser={selectedUser}/>
                ) : (
                    <p>Selecione um usuário para iniciar o chat</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;