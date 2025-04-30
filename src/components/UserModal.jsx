import React, {useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function UserModal({isOpen, toggle, onSave, userData, modalTitle}) {
    const [formData, setFormData] = useState(userData || {});

    useEffect(() => {
        setFormData(userData || {});
    }, [userData]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome || ''}
                            onChange={handleChange}
                            placeholder="Digite o nome"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            placeholder="Digite o email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password || ''}
                            onChange={handleChange}
                            placeholder="Digite a senha"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="funcao">Função</Label>
                        <Input
                            type="select"
                            id="funcao"
                            name="funcao"
                            value={formData.funcao || ''}
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma função</option>
                            <option value="admin">Admin</option>
                            <option value="professor">Professor</option>
                            <option value="aluno">Aluno</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="telefone">Telefone</Label>
                        <Input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone || ''}
                            onChange={handleChange}
                            placeholder="Digite o telefone"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dataNascimento">Data de Nascimento</Label>
                        <Input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento || ''}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>
                    Salvar
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}