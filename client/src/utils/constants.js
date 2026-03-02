export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const MONSTER_TYPES = [
  'Normal',
  'Fogo',
  'Água',
  'Elétrico',
  'Grama',
  'Gelo',
  'Luta',
  'Veneno',
  'Terra',
  'Voador',
  'Psíquico',
  'Inseto',
  'Rocha',
  'Fantasma',
  'Dragão',
  'Sombrio',
  'Aço',
  'Fada',
]

export const QUERY_KEYS = {
  MONSTERS: 'monsters',
  MONSTER: 'monster',
  FAVORITES: 'favorites',
  AUTH: 'auth',
  USER: 'user',
}
