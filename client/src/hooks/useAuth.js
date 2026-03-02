import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { useAuthStore } from '@/app/store'

export function useLogin() {
  const { setToken, setUser } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login', credentials)
      return response.data
    },
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
    },
  })
}

export function useRegister() {
  const { setToken, setUser } = useAuthStore()

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData)
      return response.data
    },
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
    },
  })
}

export function useLogout() {
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout')
    },
    onSettled: () => {
      logout()
    },
  })
}
