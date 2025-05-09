import {useState, useEffect, useRef} from 'react';
import ChatUserList from '../../components/ChatUserList';
import ChatRoom from '../../components/ChatRoom';
import {useUser} from '../../services/UserContext';
import {FormGroup, Label, Input} from 'reactstrap';
import io from 'socket.io-client';

const ChatPage = () => {
    const {user} = useUser(); // Obtemos as informações do usuário logado
    const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado no chat
    const [status, setStatus] = useState('online'); // Estado para controlar se o usuário está online/offline
    const [onlineUsers, setOnlineUsers] = useState(new Set()); // Estado global para rastrear usuários online
    const socketRef = useRef(null);

    // Configuração inicial do WebSocket
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        socketRef.current = io('http://localhost:3000', {auth: {token}});

        socketRef.current.on('connect', () => {
            console.log('🔌 Conectado ao servidor');
        });

        // Lidar com eventos de outros usuários ficando online/offline
        socketRef.current.on('usuario_online', ({email}) => {
            setOnlineUsers((prev) => new Set([...prev, email]));
        });

        socketRef.current.on('usuario_offline', ({email}) => {
            setOnlineUsers((prev) => {
                const updated = new Set(prev);
                updated.delete(email);
                return updated;
            });
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    // Atualizar o status online/offline do usuário logado
    useEffect(() => {
        if (!socketRef.current || !user) return;

        if (status === 'online') {
            socketRef.current.emit('usuario_online', {
                email: user.email,
                nome: user.nome,
            });
        } else if (status === 'offline') {
            socketRef.current.emit('usuario_offline', {
                email: user.email,
                nome: user.nome,
            });
        }

        return () => {
            // Emitir offline ao desmontar o componente ou desconectar
            if (socketRef.current) {
                socketRef.current.emit('usuario_offline', {
                    email: user.email,
                    nome: user.nome,
                });
            }
        };
    }, [status, user]);

    // Lidar com a mudança do status do usuário logado
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

            {/* Chat Layout */}
            <div style={{display: 'flex', flex: 1}}>
                <div style={{width: '30%'}}>
                    <h3>Usuários Disponíveis</h3>
                    <ChatUserList
                        onUserSelect={(email) => setSelectedUser(email)}
                        onlineUsers={onlineUsers} // Passamos apenas os usuários online via prop
                    />
                </div>
                <div style={{width: '70%'}}>
                    {selectedUser ? (
                        <ChatRoom
                            selectedUser={selectedUser}
                            onCloseChat={() => setSelectedUser(null)} // Reseta o selecionado ao fechar o chat
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