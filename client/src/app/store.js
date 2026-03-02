import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    set({ token, isAuthenticated: !!token })
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))


export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  
  setFavorites: (favorites) => set({ favorites }),
  
  addFavorite: (monster) =>
    set((state) => ({
      favorites: [...state.favorites, monster],
    })),
  
  removeFavorite: (monsterId) =>
    set((state) => ({
      favorites: state.favorites.filter((m) => m.id !== monsterId),
    })),
  
  isFavorited: (monsterId) => {
    const state = get()
    return state.favorites.some((m) => m.id === monsterId)
  },
  
  toggleFavorite: (monster) => {
    const { isFavorited, addFavorite, removeFavorite } = get()
    if (isFavorited(monster.id)) {
      removeFavorite(monster.id)
    } else {
      addFavorite(monster)
    }
  },
}))
