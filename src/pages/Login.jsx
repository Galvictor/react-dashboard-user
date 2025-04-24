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
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(false);
        setLoading(true);

        const success = await login(user, pass);

        setLoading(false);

        if (success) {
            navigate('/dashboard');
        } else {
            setError(true);
        }
    };

    return (
        <Container className="mt-5" style={{maxWidth: 400}}>
            <h2>Login</h2>

            {error && <Alert color="danger">Usuário ou senha inválidos</Alert>}

            <Form>
                <FormGroup>
                    <Label for="username">Usuário</Label>
                    <Input
                        id="username"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input
                        type="password"
                        id="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />
                </FormGroup>

                <Button color="primary" onClick={handleLogin} disabled={loading}>
                    {loading ? <Spinner size="sm"/> : 'Entrar'}
                </Button>
            </Form>
        </Container>
    );
}
