import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useUser} from '../services/UserContext';

const ChatRoom = ({selectedUser}) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [typingUser, setTypingUser] = useState(null);
    const {user} = useUser(); // Obtém informações do usuário logado

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            auth: {token: sessionStorage.getItem('token')},
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
        });

        newSocket.on('receive_private_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        newSocket.on('user_typing', ({name}) => {
            setTypingUser(name);
            setTimeout(() => setTypingUser(null), 2000);
        });

        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (socket && selectedUser) {
            socket.emit('join_private_room', {to: selectedUser});
        }
    }, [socket, selectedUser]);

    const sendMessage = () => {
        if (message.trim() && socket) {
            socket.emit('send_private_message', {
                to: selectedUser,
                message: message.trim(),
            });

            // Adiciona a mensagem localmente enquanto envia para o servidor
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    from: user.email,
                    to: selectedUser,
                    message: message.trim(),
                    timestamp: new Date().toISOString(),
                },
            ]);

            setMessage('');
        }
    };

    const handleTyping = () => {
        if (socket) {
            socket.emit('typing', {to: selectedUser});
        }
    };

    return (
        <div>
            <h3>Chat com: {selectedUser}</h3>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.from === user.email ? 'Você' : msg.name}</strong>: {msg.message}
                    </div>
                ))}
                {typingUser && <p>{typingUser} está digitando...</p>}
            </div>
            <input
                type="text"
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleTyping}
                placeholder="Digite sua mensagem..."
            />
            <button className="chat-button" onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default ChatRoom;