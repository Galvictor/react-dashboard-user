# React Dashboard Auth (com Vite + Reactstrap + SCSS)

Este projeto é um painel de administração simples com login simulado, usando:

- ⚛️ React (sem TypeScript)
- ⚡ Vite
- 🎨 SCSS
- 🧩 Reactstrap + Bootstrap + Bootstrap Icons
- 🔒 Autenticação com rota protegida (login: `admin`, senha: `123456`)
- 🧱 Layout responsivo com menu lateral fixo e conteúdo à direita

---

## 📦 Instalação

```bash
npm install
```

---

## ▶️ Rodar localmente

```bash
npm run dev
```

---

## 🔐 Login Simulado

- **Usuário:** `admin`
- **Senha:** `123456`

> A autenticação é feita no front-end, mas já está preparada para ser conectada com uma API usando `axios`.

---

## 📁 Estrutura

```
src/
├── auth.js               # Lógica de login e sessão
├── main.jsx              # Entrada principal
├── App.jsx               # Rotas e proteção
├── styles/
│   └── main.scss         # Estilos globais (importa o layout)
├── layouts/
│   └── DashboardLayout.jsx
│   └── DashboardLayout.scss
└── pages/
    ├── Login.jsx         # Página de login
    ├── Dashboard.jsx     # Encapsula layout
    └── TestRoute.jsx     # Rota de exemplo dentro do dashboard
```

---

## 📌 Rotas

| Rota             | Protegida? | Descrição                       |
|------------------|------------|----------------------------------|
| `/`              | ❌         | Tela de login                    |
| `/dashboard`     | ✅         | Layout do painel                 |
| `/dashboard/teste` | ✅      | Rota de teste dentro do painel  |

---

## 📚 Tecnologias Usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Reactstrap](https://reactstrap.github.io/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Axios](https://axios-http.com/)

---

## 🛠️ To-Do (opcional)

- [ ] Integrar com API real
- [ ] Adicionar menu colapsável para mobile
- [ ] Criar novos módulos/páginas internas

---

Feito com 💙 por Galvicotr — 2025