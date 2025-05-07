import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const ChatRoom = ({userEmail, selectedUser}) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            auth: {token: sessionStorage.getItem('token')}, // Obtém o token do armazenamento local
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
        });

        newSocket.on('receive_private_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        newSocket.on('user_typing', (data) => {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000);
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

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    from: userEmail,
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
                        <strong>{msg.from === userEmail ? 'Você' : 'Outro'}</strong>: {msg.message}
                    </div>
                ))}
                {isTyping && <p>Usuário está digitando...</p>}
            </div>
            <input
                type="text"
                className="chat-input"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleTyping}
            />
            <button className="chat-button" onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default ChatRoom;