import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

// Exemplo de hook customizado
export function useExample() {
  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const response = await api.get('/example')
      return response.data
    },
  })
}
