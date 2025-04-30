# React Dashboard Users

Um painel de administração simples e funcional, com autenticação baseada em funções e navegação protegida. O projeto é construído em React com Vite, SCSS e Reactstrap.

---

## ✨ Funcionalidades

- **Autenticação Simulada**: Suporte a login/logout.
- **Proteção de Rotas**: Apenas usuários autenticados podem acessar áreas específicas.
- **Controle de Permissões**:
    - **Admin**: Acesso total (criar, editar, deletar e listar usuários).
    - **Professor**: Pode apenas listar usuários.
    - **Aluno**: Pode visualizar somente seu próprio perfil, editar e deletar ele proprio.
- **Layout Responsivo**:
    - Menu lateral fixo.
    - Conteúdo principal responsivo.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React**: Biblioteca para a construção de interfaces de usuário.
- ⚡ **Vite**: Ferramenta de build rápida.
- 🎨 **SCSS**: Estilização moderna e bem organizada.
- 🧩 **Reactstrap**: Componentes prontos e responsivos.
- 🛠️ **Axios**: Comunicação com APIs.
- 🎨 **Bootstrap Icons**: Ícones modernos e consistentes.

---

## 📦 Pré-requisitos

- Node.js (versão estável recomendada)
- NPM ou Yarn

---

## 📋 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/react-dashboard-users.git
   cd react-dashboard-users
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173/
   ```

---

## 🛠️ Estrutura do Projeto

```
src/
├── assets/                # Arquivos estáticos (imagens, fontes, etc.)
├── components/            # Componentes reutilizáveis (tabelas, permissões, paginação)
├── layouts/               # Layout principal do dashboard
├── pages/                 # Páginas do sistema (login, dashboard, usuários, perfil)
├── routes/                # Configuração de rotas com autenticação
├── services/              # Serviços de API e autenticação
├── styles/                # Estilos globais (SCSS)
├── utils/                 # Funções auxiliares e formatadores
├── App.jsx                # Componente principal
├── main.jsx               # Ponto de entrada da aplicação
```

---

## 🔐 Login Simulado

Para fins de demonstração, utilize os seguintes dados de login:

### Usuário 1 (Admin)
- **Email:** admin@email.com
- **Senha:** 123456
- **Permissões:** Total acesso (criar, editar, remover e listar).

### Usuário 2 (Professor)
- **Email:** professor@email.com
- **Senha:** 123456
- **Permissões:** Apenas listar usuários.

### Usuário 3 (Aluno)
- **Email:** aluno@email.com
- **Senha:** 123456
- **Permissões:** Visualizar apenas o próprio perfil.

---

## 📌 Rotas e Permissões

| Rota                    | Proteção          | Descrição                       | Acesso                            |
|-------------------------|-------------------|---------------------------------|-----------------------------------|
| `/`                     | ❌ Não protegida  | Tela de login                   | Todos                            |
| `/dashboard`            | ✅ Protegida      | Página inicial do painel        | Admin, Professor, Aluno          |
| `/dashboard/usuarios`   | ✅ Protegida      | Listagem de usuários            | Admin, Professor                 |
| `/dashboard/profile`    | ✅ Protegida      | Dados do perfil do usuário      | Admin, Professor, Aluno          |

---

## 🗂️ Componentes Importantes

### 1. **Permission**:
Componente que verifica permissões antes de renderizar elementos sensíveis, como botões ou links.
```jsx
<Permission roles={['admin']}>
    <button>Excluir Usuário</button>
</Permission>
```

### 2. **ProtectedRoute**:
Proteção de rotas baseada na autenticação e permissões de usuário.
```jsx
<ProtectedRoute roles={['admin', 'professor']}>
    <UsersList />
</ProtectedRoute>
```

---

## 📚 Próximos Passos

- [ ] Conectar a API real para gerenciar usuários.
- [ ] Melhorar o layout para dispositivos móveis.
- [ ] Adicionar testes automatizados.

---

## 🙌 Contribuição

Sinta-se à vontade para contribuir com melhorias para o projeto. Crie um fork, desenvolva e abra um pull request!

---

## 📝 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

---

Feito com 💙 por **Galvicotr** 🚀