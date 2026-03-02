import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useMonsters(params = {}) {
  return useQuery({
    queryKey: ['monsters', params],
    queryFn: async () => {
      // Unificamos: Tudo vai para /monster, o que muda é o parâmetro
      const response = await api.get('/monster', { 
        params: { 
          search: params.search // Enviamos 'search' para bater com o backend
        } 
      });
      
      console.log("📦 Dados que chegaram no Front:", response.data);
      return response.data;
    },
  });
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
