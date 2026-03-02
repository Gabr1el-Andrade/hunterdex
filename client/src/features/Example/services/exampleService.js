import { api } from '@/services/api'

const exampleService = {
  getAll: async () => {
    const response = await api.get('/example')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/example/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/example', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/example/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    await api.delete(`/example/${id}`)
  },
}

export default exampleService
