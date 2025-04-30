
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setUser(response.data.data);
      setFormData({
        nome: response.data.data.nome,
        dataNascimento: response.data.data.dataNascimento,
        telefone: response.data.data.telefone,
        email: response.data.data.email
      });
    } catch (err) {
      setError('Erro ao carregar perfil');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setSuccess('Perfil atualizado com sucesso!');
      setEditMode(false);
      fetchUserProfile();
    } catch (err) {
      setError('Erro ao atualizar perfil');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar sua conta?')) {
      try {
        await axios.delete(`http://localhost:3000/users/${user.id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        localStorage.removeItem('token');
        navigate('/login');
      } catch (err) {
        setError('Erro ao deletar conta');
      }
    }
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h2 className="mb-4">Meu Perfil</h2>
        
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        {editMode ? (
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button color="primary" type="submit" className="me-2">
              Salvar
            </Button>
            <Button color="secondary" onClick={() => setEditMode(false)}>
              Cancelar
            </Button>
          </Form>
        ) : (
          <div>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Data de Nascimento:</strong> {new Date(user.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Telefone:</strong> {user.telefone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Função:</strong> {user.funcao}</p>
            <p><strong>Criado em:</strong> {new Date(user.criadoEm).toLocaleDateString()}</p>

            <Button color="primary" onClick={() => setEditMode(true)} className="me-2">
              Editar Perfil
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Deletar Conta
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Profile;