import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {useUser} from '../services/UserContext';

const ChatRoom = ({selectedUser}) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typingUser, setTypingUser] = useState(null);
    const {user} = useUser();
    const socketRef = useRef(null);

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
            console.log(`${name} está digitando...`);
            setTypingUser(name);
            setTimeout(() => setTypingUser(null), 2000);
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (socketRef.current && selectedUser) {
            socketRef.current.emit('join_private_room', {to: selectedUser});
        }
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