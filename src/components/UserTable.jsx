import React from 'react';
import {Table, Badge, Button} from 'reactstrap';
import {formatDate, getBadgeColor} from '../utils/formatters';
import Permission from "./Permission.jsx";

export default function UserTable({users, onEdit, onDelete, highlightUserId}) {
    return (
        <Table hover className="align-middle">
            <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Data Nasc.</th>
                <th>Função</th>
                <th>Criado em</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className={highlightUserId === user.id ? 'highlight-row' : ''}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.telefone}</td>
                    <td>{formatDate(user.dataNascimento)}</td>
                    <td>
                        <Badge color={getBadgeColor(user.funcao)} pill>
                            {user.funcao}
                        </Badge>
                    </td>
                    <td>{formatDate(user.criadoEm)}</td>
                    <td className="text-end">
                        {/* Botão de editar - apenas admin pode ver */}
                        <Permission roles={['admin']}>
                            <Button
                                color="link"
                                className="btn-action"
                                onClick={() => onEdit(user)}
                            >
                                <i className="bi bi-pencil-square"/>
                            </Button>
                        </Permission>

                        {/* Botão de deletar - apenas admin pode ver */}
                        <Permission roles={['admin']}>
                            <Button
                                color="link"
                                className="btn-action text-danger"
                                onClick={() => onDelete(user)}
                            >
                                <i className="bi bi-trash"/>
                            </Button>
                        </Permission>
                    </td>

                </tr>
            ))}
            </tbody>
        </Table>
    );
}