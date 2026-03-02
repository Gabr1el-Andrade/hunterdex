# HunterDex - Frontend

Frontend da aplicação HunterDex.

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── router.jsx         # Rotas da aplicação
│   ├── providers.jsx      # Providers React Query
│   └── store/             # Zustand stores
│       ├── authStore.js   # Store de autenticação
│       ├── favoritesStore.js  # Store de favoritos
│       └── index.js       # Exports
├── components/            # Componentes reutilizáveis
│   ├── Layout/
│   │   ├── index.jsx      # Layout principal
│   │   └── Header.jsx     # Header da aplicação
│   ├── Card/
│   │   ├── MonsterCard.jsx    # Card individual de monstro
│   │   └── MonsterGrid.jsx    # Grid de monstros
│   ├── Form/
│   │   ├── Input.jsx      # Componente de input
│   │   └── Button.jsx     # Componente de button
│   ├── Loading/
│   │   └── Spinner.jsx    # Spinner de carregamento
│   └── index.js           # Exports
├── pages/                 # Páginas da aplicação
│   ├── Home/
│   │   ├── index.jsx      # Página inicial
│   │   └── Home.module.css
│   ├── Auth/
│   │   ├── Login.jsx      # Página de login
│   │   ├── Register.jsx   # Página de registro
│   │   └── index.js       # Exports
│   ├── Monster/
│   │   ├── index.jsx      # Detalhes do monstro
│   │   └── Monster.module.css
│   └── Favorites/
│       ├── index.jsx      # Página de favoritos
│       └── Favorites.module.css
├── hooks/                 # Hooks customizados
│   ├── useMonster.js      # Hooks para monstros
│   ├── useAuth.js         # Hooks de autenticação
│   ├── useFavorites.js    # Hooks de favoritos
│   └── index.js           # Exports
├── services/
│   └── api.js             # Instância do axios
├── utils/                 # Funções utilitárias
│   ├── constants.js       # Constantes da aplicação
│   ├── helpers.js         # Funções auxiliares
│   ├── errors.js          # Tratamento de erros
│   └── index.js           # Exports
├── styles/                # Estilos globais
├── App.jsx                # Componente root
├── main.jsx               # Entry point
├── App.css                # Estilos gerais
└── index.css              # Reset e estilos globais
```

## Como Começar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   cd client
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Edite `.env` com suas configurações:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

A aplicação será aberta em `http://localhost:5173`

## Dependências Principais

- **React 18** - Biblioteca UI
- **React Router** - Roteamento
- **Vite** - Build tool
- **Zustand** - State management
- **TanStack React Query** - Gerenciamento de dados assincronos
- **Axios** - HTTP client
- **CSS Modules** - Estilos com escopo

## Funcionalidades

- Autenticação (Login/Registro)
- Listagem de monstros
- Busca e filtros
- Detalhes do monstro
- Sistema de favoritos
- Persistência de dados

## Autenticação

A autenticação é gerenciada pelo Zustand (`authStore`). O token JWT é armazenado no localStorage e enviado em cada requisição via interceptor do Axios.

## State Management

### Zustand Stores

#### `authStore`
- `user` - Dados do usuário logado
- `token` - Token JWT
- `isAuthenticated` - Status de autenticação
- `setUser()` - Atualiza usuário
- `setToken()` - Atualiza token
- `logout()` - Faz logout

#### `favoritesStore`
- `favorites` - Array de monstros favoritos
- `addFavorite()` - Adiciona aos favoritos
- `removeFavorite()` - Remove dos favoritos
- `isFavorited()` - Verifica se está favoritado
- `toggleFavorite()` - Alterna favorito

## Estilos

O projeto utiliza CSS Modules para estilos com escopo. A paleta de cores:

- **Primária** (Destaque): `#ff6b6b` (Vermelho)
- **Fundo**: `#0f0f0f` (Preto muito escuro)
- **Superfície**: `#1a1a1a` (Preto)
- **Texto**: `#ffffff` (Branco)
- **Secundário**: `#999` (Cinza)

## Fluxo de Dados

```
API (Backend) 
    ↓
Axios + React Query
    ↓
Componentes ← Zustand (local state)
```

## Scripts

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Componentes principais

### Layout
Componente que envolve todas as páginas com header e nav.

### MonsterCard & MonsterGrid
Exibe monstros em cards com opção de favoritar.

### Input & Button
Componentes de form reutilizáveis.

## 🐛 Troubleshooting

### CORS Error
Verifique se o backend está rodando e se `VITE_API_URL` está correto.

### Token expirado
O usuário será redirecionado para login automaticamente.

### Componentes não carregam
Verifique se os imports estão usando `@` alias corretamente.

## Recursos Úteis

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query)

---

