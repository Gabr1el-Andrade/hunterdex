import { create } from 'zustand'

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
