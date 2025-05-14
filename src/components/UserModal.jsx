import React, {useEffect, useState} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from 'reactstrap';

export default function UserModal({isOpen, toggle, onSave, userData, modalTitle}) {
    const [formData, setFormData] = useState({
        ...userData,
        confirmPassword: '' // Adiciona o campo confirmPassword diretamente no formData
    });
    const [errors, setErrors] = useState({}); // Armazena os erros de validação por campo

    useEffect(() => {
        setFormData({
            ...userData,
            confirmPassword: ''
        }); // Define confirmPassword sempre que o modal é aberto com dados existentes
        setErrors({});
    }, [userData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

        // Remove mensagem de erro ao preencher o campo
        if (value) {
            setErrors((prev) => ({...prev, [name]: false}));
        }

        // Validação dinâmica para confirmar senha
        if (name === 'confirmPassword' && value === formData.password) {
            setErrors((prev) => ({...prev, confirmPassword: false}));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Valida se todos os campos estão preenchidos
        if (!formData.nome) newErrors.nome = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.password) newErrors.password = true;
        if (!formData.funcao) newErrors.funcao = true;
        if (!formData.telefone) newErrors.telefone = true;
        if (!formData.dataNascimento) newErrors.dataNascimento = true;

        // Valida se a confirmação da senha coincide
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = true;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(formData); // Confirmação de senha também será enviada agora
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody>
                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <Label for="nome">Nome</Label>
                                <Input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome || ''}
                                    onChange={handleChange}
                                    placeholder="Digite o nome"
                                    invalid={!!errors.nome}
                                />
                                <FormFeedback>Este campo é obrigatório.</FormFeedback>
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
                                    invalid={!!errors.email}
                                />
                                <FormFeedback>Este campo é obrigatório.</FormFeedback>
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
                                    invalid={!!errors.password}
                                />
                                <FormFeedback>Este campo é obrigatório.</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirme a Senha</Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword || ''}
                                    onChange={handleChange}
                                    placeholder="Confirme a senha"
                                    invalid={!!errors.confirmPassword}
                                />
                                <FormFeedback>
                                    {formData.confirmPassword !== formData.password
                                        ? 'As senhas não coincidem.'
                                        : 'Este campo é obrigatório.'}
                                </FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label for="funcao">Função</Label>
                                <Input
                                    type="select"
                                    id="funcao"
                                    name="funcao"
                                    value={formData.funcao || ''}
                                    onChange={handleChange}
                                    invalid={!!errors.funcao}
                                >
                                    <option value="">Selecione uma função</option>
                                    <option value="admin">Admin</option>
                                    <option value="professor">Professor</option>
                                    <option value="aluno">Aluno</option>
                                </Input>
                                <FormFeedback>Este campo é obrigatório.</FormFeedback>
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
                                    invalid={!!errors.telefone}
                                />
                                <FormFeedback>Este campo é obrigatório.</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dataNascimento">Data de Nascimento</Label>
                                <Input
                                    type="date"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    value={formData.dataNascimento || ''}
                                    onChange={handleChange}
                                    invalid={!!errors.dataNascimento}
                                />
                                <FormFeedback>Este campo é obrigatório.</FormFeedback>
                            </FormGroup>
                        </div>
                    </div>
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