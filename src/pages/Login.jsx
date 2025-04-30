import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../auth';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Spinner
} from 'reactstrap';

export default function Login() {
    const [email, setEmail] = useState('ana.silva@email.com');
    const [password, setPassword] = useState('senhaSegura123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!email || !password) {
            setError('Email e senha são obrigatórios');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);

            if (success) {
                navigate('/dashboard');
            } else {
                setError('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao logar:', error);
            setError('Erro ao conectar com o servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5" style={{maxWidth: 400}}>
            <h2 className="mb-4">Login</h2>

            {error && <Alert color="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Seu email"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Sua senha"
                    />
                </FormGroup>

                <Button color="primary" type="submit" disabled={loading} className="w-100">
                    {loading ? <Spinner size="sm"/> : 'Entrar'}
                </Button>
            </Form>
        </Container>
    );
}