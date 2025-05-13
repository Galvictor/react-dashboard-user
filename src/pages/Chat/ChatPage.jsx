import {useState, useEffect, useRef} from 'react';
import ChatUserList from '../../components/ChatUserList';
import ChatRoom from '../../components/ChatRoom';
import {useUser} from '../../services/UserContext';
import {FormGroup, Label, Input} from 'reactstrap';
import io from 'socket.io-client';

const ChatPage = () => {
    const {user} = useUser(); // Usuário autenticado no sistema
    const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado para o chat
    const [status, setStatus] = useState('online'); // Controle do status do usuário atual (online/offline)
    const [onlineUsers, setOnlineUsers] = useState(new Set()); // Lista global de usuários online
    const socketRef = useRef(null); // Instância do WebSocket

    // Conectar ao WebSocket e configurar eventos
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        socketRef.current = io('http://localhost:3000', {auth: {token}});

        socketRef.current.on('connect', () => {
            console.log('🔌 Conectado ao servidor');
        });

        // Escuta os eventos de outros usuários que ficam online
        socketRef.current.on('usuario_online', ({email}) => {
            console.log(`${email} ficou Online`);
            setOnlineUsers((prev) => new Set([...prev, email])); // Adiciona à lista de usuários online
        });

        // Escuta os eventos de outros usuários que saem ou ficam offline
        socketRef.current.on('usuario_offline', ({email}) => {
            console.log(`${email} ficou Offline`);
            setOnlineUsers((prev) => {
                const updated = new Set(prev);
                updated.delete(email); // Remove da lista de usuários online
                return updated;
            });
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    // Atualizar o status do usuário atual e notificar o backend via WebSocket
    useEffect(() => {
        if (!socketRef.current || !user) return;

        if (status === 'online') {
            // Ao mudar para "online", emitir evento `usuario_online`
            socketRef.current.emit('usuario_online', {
                email: user.email,
                nome: user.nome,
            });
        } else if (status === 'offline') {
            // Ao mudar para "offline", emitir evento `usuario_offline`
            socketRef.current.emit('usuario_offline', {
                email: user.email,
                nome: user.nome,
            });
        }

        return () => {
            // Emitir `offline` ao desmontar ou desconectar
            if (socketRef.current) {
                socketRef.current.emit('usuario_offline', {
                    email: user.email,
                    nome: user.nome,
                });
            }
        };
    }, [status, user]);

    // Mudar o status do usuário atual
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    if (!user) {
        return <p>Carregando dados do usuário...</p>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* Controle de Status */}
            <FormGroup style={{marginBottom: '1rem', alignSelf: 'flex-start'}}>
                <Label for="status-select">Alterar Status:</Label>
                <Input
                    id="status-select"
                    type="select"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </Input>
            </FormGroup>

            {/* Layout da Página de Chat */}
            <div style={{display: 'flex', flex: 1}}>
                <div style={{width: '30%'}}>
                    <h3>Usuários Disponíveis</h3>
                    <ChatUserList
                        onUserSelect={(email) => setSelectedUser(email)}
                        onlineUsers={onlineUsers} // Passamos os usuários online como prop
                    />
                </div>
                <div style={{width: '70%'}}>
                    {selectedUser ? (
                        <ChatRoom
                            selectedUser={selectedUser}
                            onCloseChat={() => setSelectedUser(null)} // Limpa usuário selecionado ao fechar
                        />
                    ) : (
                        <p>Selecione um usuário para iniciar o chat</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;