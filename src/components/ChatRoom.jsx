import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {useUser} from '../services/UserContext';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Input,
    InputGroup,
    Button,
    ListGroup,
    ListGroupItem,
    Spinner
} from 'reactstrap';
import {BsSend, BsPersonCircle, BsXCircle} from 'react-icons/bs';
import {getRoomHistory} from "../services/api.js";

const ChatRoom = ({selectedUser, onCloseChat}) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typingUser, setTypingUser] = useState(null);
    const [userInRoom, setUserInRoom] = useState(false);
    const {user} = useUser();
    const socketRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const chatMessagesRef = useRef(null);

    const fetchMessageHistory = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const roomId = `${user?.email}-${selectedUser}`;
            const response = await getRoomHistory(roomId);

            if (response) {
                setMessages(response);
            }
        } catch (error) {
            console.error('Erro ao buscar histórico de mensagens:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatMessagesRef.current) {
            // Rolando o container de mensagens para o final quando uma nova mensagem é adicionada
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]); // Monitora mudanças na lista de mensagens

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token || socketRef.current) return;

        const socket = io('http://localhost:3000', {
            auth: {token},
        });

        socket.on('connect', () => {
            console.log('🔌 Conectado ao servidor');
        });

        socket.on('receive_private_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('user_typing', ({name}) => {
            setTypingUser(name);
            setTimeout(() => setTypingUser(null), 2000);
        });

        socket.on('usuario_entrou_na_sala', ({nome}) => {
            setUserInRoom(true);
            console.log(`${nome} entrou na sala`);
        });

        socket.on('usuario_saiu_da_sala', ({nome}) => {
            setUserInRoom(false);
            console.log(`${nome} saiu da sala`);
        });

        socketRef.current = socket;

        return () => {
            if (socketRef.current) socket.disconnect();
            socketRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (socketRef.current && selectedUser) {
            fetchMessageHistory();
            socketRef.current.emit('join_private_room', {to: selectedUser});
        }
        return () => {
            if (socketRef.current && selectedUser) {
                socketRef.current.emit('leave_private_room', {to: selectedUser});
            }
        };
    }, [selectedUser]);

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit('send_private_message', {
                to: selectedUser,
                message: message.trim(),
            });

            setMessage('');
        }
    };

    const handleTyping = () => {
        if (socketRef.current) {
            socketRef.current.emit('typing', {to: selectedUser});
        }
    };

    return (
        <Container>
            <Card className="shadow">
                <CardHeader className="bg-primary text-white d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <BsPersonCircle className="me-2" size={24}/>
                        <h5 className="mb-0">Chat com: {selectedUser || 'Usuário Desconhecido'}</h5>
                    </div>
                    <BsXCircle
                        size={24}
                        className="cursor-pointer text-white"
                        onClick={() => {
                            if (socketRef.current && selectedUser) {
                                socketRef.current.emit('leave_private_room', {to: selectedUser});
                            }
                            onCloseChat();
                        }}
                    />
                </CardHeader>
                <CardBody>
                    <div className="chat-messages" ref={chatMessagesRef}>
                        {isLoading ? (
                            <div className="d-flex justify-content-center align-items-center p-4">
                                <Spinner color="primary">
                                    Carregando...
                                </Spinner>
                            </div>
                        ) : (
                            <ListGroup className="mb-3">
                                {messages.map((msg, index) => (
                                    <ListGroupItem
                                        key={index}
                                        className={`d-flex ${
                                            msg.from === user.email ? 'justify-content-end' : 'justify-content-start'
                                        }`}
                                    >
                                        <div
                                            className={`p-2 rounded ${
                                                msg.from === user.email ? 'bg-primary text-white' : 'bg-light'
                                            }`}
                                            style={{maxWidth: '75%'}}
                                        >
                                            <strong>{msg.from === user.email ? 'Você' : msg.name}</strong>: {msg.message}
                                        </div>
                                    </ListGroupItem>
                                ))}
                                {typingUser && (
                                    <ListGroupItem className="text-muted small">
                                        {typingUser} está digitando...
                                    </ListGroupItem>
                                )}
                                {userInRoom && (
                                    <ListGroupItem className="text-success small">
                                        {selectedUser} está na sala
                                    </ListGroupItem>
                                )}
                                {!userInRoom && (
                                    <ListGroupItem className="text-muted small">
                                        {selectedUser} saiu da sala
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        )}
                    </div>

                    <InputGroup>
                        <Input
                            type="text"
                            className="chat-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                handleTyping(); // Enviar evento de "digitando"
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault(); // Evitar quebra de linha
                                    sendMessage(); // Chamar a função de envio
                                }
                            }}
                            placeholder="Digite sua mensagem..."
                        />
                        <Button color="primary" onClick={sendMessage} disabled={!message.trim()}>
                            <BsSend/>
                        </Button>
                    </InputGroup>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ChatRoom;