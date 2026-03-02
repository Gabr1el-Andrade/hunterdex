# Guia de Desenvolvimento - HunterDex Frontend

## Convenções do Projeto

### Estrutura de Pastas

```
feature/
├── components/        # Componentes da feature
├── hooks/            # Hooks customizados
├── services/         # Serviços/APIs
├── utils/            # Utilidades
└── index.js          # Exports públicos
```

### Naming Conventions

- **Componentes**: PascalCase (`Header.jsx`, `MonsterCard.jsx`)
- **Hooks**: camelCase com prefixo "use" (`useMonster.js`, `useAuth.js`)
- **Services**: camelCase (`monsterService.js`)
- **Variáveis/Funções**: camelCase (`formatNumber`, `handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MONSTER_TYPES`)

### Imports

Use o alias `@` para imports:

```javascript
// Correto
import Layout from '@/components/Layout'
import { useMonsters } from '@/hooks'
import { formatNumber } from '@/utils'

// Evitar
import Layout from '../../components/Layout'
import { useMonsters } from '../../../hooks'
```

## Criando um Novo Componente

### Exemplo: Componente de Alerta

```jsx
// src/components/Alert/Alert.jsx
import styles from './Alert.module.css'

export default function Alert({ type = 'info', message, onClose }) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p>{message}</p>
      {onClose && <button onClick={onClose}>×</button>}
    </div>
  )
}
```

```css
/* src/components/Alert/Alert.module.css */
.alert {
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
}

.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.error {
  background-color: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
}
```

```js
// src/components/Alert/index.js
export { default as Alert } from './Alert'
```

## 🪝 Criando um Novo Hook

### Exemplo: Hook para Paginação

```javascript
// src/hooks/usePagination.js
import { useState } from 'react'

export function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  }
}
```

## Criando um Novo Serviço/Hook de API

### Exemplo: Para uma Nova Feature

```javascript
// src/hooks/usePosts.js
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export function usePosts(params = {}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      const response = await api.get('/posts', { params })
      return response.data
    },
  })
}

export function usePost(id) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await api.get(`/posts/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreatePost() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/posts', data)
      return response.data
    },
  })
}

export function useUpdatePost() {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/posts/${id}`, data)
      return response.data
    },
  })
}

export function useDeletePost() {
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/posts/${id}`)
    },
  })
}
```

## Guia de Estilos

### Cores Globais

```css
/* Cores primárias */
--primary: #ff6b6b;      /* Vermelho */
--primary-dark: #ff5252; /* Vermelho escuro */

/* Neutros */
--bg-primary: #0f0f0f;   /* Fundo main */
--bg-secondary: #1a1a1a; /* Fundo cards */
--bg-tertiary: #2a2a2a;  /* Fundo hover */

--text-primary: #ffffff; /* Texto principal */
--text-secondary: #ccc;  /* Texto secundário */
--text-muted: #999;      /* Texto desativado */

--border: #333;          /* Bordas */
```

### Responsive Design

```css
/* Desktop First Approach */
@media (max-width: 1024px) {
  /* Tablets */
}

@media (max-width: 768px) {
  /* Tablets pequenos */
}

@media (max-width: 640px) {
  /* Mobile */
}
```

## 🧪 Padrões de Teste

```javascript
// Exemplo de estrutura de teste
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Layout/Header'

describe('Header Component', () => {
  it('should render header with logo', () => {
    render(<Header />)
    expect(screen.getByText(/HunterDex/i)).toBeInTheDocument()
  })
})
```

## Checklist para Nova Página

- [ ] Criar pasta em `src/pages/NomePagina/`
- [ ] Criar `index.jsx` com componente exportado como default
- [ ] Criar `NomePagina.module.css` com estilos
- [ ] Adicionar rota em `src/app/router.jsx`
- [ ] Usar `Layout` do projeto
- [ ] Implementar tratamento de erros
- [ ] Adicionar loading states
- [ ] Documentar em README

## Debugging

### DevTools Úteis

```javascript
// Logar dados do Zustand
import { useFavoritesStore } from '@/app/store'

function Debug() {
  const store = useFavoritesStore()
  console.log('Store state:', store)
  return null
}
```

### React Query DevTools

```javascript
// Adicionar em Providers
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<ReactQueryDevtools initialIsOpen={false} />
```

## Performance

### Otimizações Recomendadas

1. **Code Splitting**: Use lazy loading para rotas
   ```javascript
   const Home = lazy(() => import('@/pages/Home'))
   ```

2. **Memoization**: Para componentes pesados
   ```javascript
   export default memo(MonsterCard)
   ```

3. **Query Invalidation**: Revalidar dados quando necessário
   ```javascript
   queryClient.invalidateQueries({ queryKey: ['monsters'] })
   ```

## Recursos

- [React Best Practices](https://react.dev/learn)
- [Vite Guide](https://vitejs.dev/guide/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)

---

