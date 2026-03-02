import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useMonsters(params = {}) {
  return useQuery({
    queryKey: ['monsters', params],
    queryFn: async () => {
      // LOG PARA DEBUG
      console.log("🛠️ Montando busca de monstros com params:", params);
      console.log("🌐 URL Base da API:", api.defaults.baseURL);

      if (params.search) {
        const url = '/monster/search'; // Verifique se não é /monsters/search
        console.log(`📡 Chamando: ${url}?q=${params.search}`);
        const response = await api.get(url, { params: { q: params.search } })
        return response.data
      }

      const url = '/monster'; // CUIDADO: Seu backend pode estar esperando '/monsters' ou '/auth/monsters'
      console.log(`📡 Chamando: ${url}`);
      
      const response = await api.get(url, { params })
      return response.data
    },
  })
}

export function useMonsterById(id) {
  return useQuery({
    queryKey: ['monster', id],
    queryFn: async () => {
      const response = await api.get(`/monster/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateMonster() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(`/monster/${data.id}`, data)
      return response.data
    },
  })
}

export function useUpdateMonster() {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/monster/${id}`, data)
      return response.data
    },
  })
}

export function useDeleteMonster() {
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/monster/${id}`)
    },
  })
}
