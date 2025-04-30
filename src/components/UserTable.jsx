import React from 'react';
import { Table, Badge, Button } from 'reactstrap';
import { formatDate, getBadgeColor } from '../utils/formatters';

export default function UserTable({ users }) {
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
          <tr key={user.id}>
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
            <td>
              <Button color="link" className="btn-action" title="Editar">
                <i className="bi bi-pencil-square"></i>
              </Button>
              <Button color="link" className="btn-action text-danger" title="Excluir">
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}