import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { useFavoritesStore } from '@/app/store'

export function useAddFavorite() {
  const { addFavorite } = useFavoritesStore()

  return useMutation({
    mutationFn: async (monster) => {
      // server expects POST /favorites/:id
      const response = await api.post(`/favorites/${monster.id}`)
      return response.data
    },
    onSuccess: (data, monster) => {
      // keep client store in sync using the monster object
      addFavorite(monster)
    },
  })
}

export function useRemoveFavorite() {
  const { removeFavorite } = useFavoritesStore()

  return useMutation({
    mutationFn: async (monsterId) => {
      await api.delete(`/favorites/${monsterId}`)
    },
    onSuccess: (_, monsterId) => {
      removeFavorite(monsterId)
    },
  })
}

export function useFavorites() {
  const store = useFavoritesStore()
  return store
}
