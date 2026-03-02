export function handleApiError(error) {
  if (error.response?.status === 401) {
    // Token expirou
    localStorage.removeItem('token')
    window.location.href = '/auth/login'
    return 'Sessão expirada. Faça login novamente.'
  }

  if (error.response?.status === 403) {
    return 'Você não tem permissão para fazer isso.'
  }

  if (error.response?.status === 404) {
    return 'Recurso não encontrado.'
  }

  if (error.response?.status === 500) {
    return 'Erro no servidor. Tente novamente mais tarde.'
  }

  return error.response?.data?.message || 'Ocorreu um erro. Tente novamente.'
}

export function isAuthError(error) {
  return error.response?.status === 401
}

export function isNotFoundError(error) {
  return error.response?.status === 404
}
