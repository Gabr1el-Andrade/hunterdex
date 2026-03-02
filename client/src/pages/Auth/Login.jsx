import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import { Input, Button } from '@/components/Form'
import { useLogin } from '@/hooks'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const mutation = useLogin()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (!formData.email || !formData.password) {
      setErrors({ general: 'Preencha todos os campos' })
      return
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (error) => {
        setErrors({ general: error.response?.data?.message || 'Erro ao fazer login' })
      },
    })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Login</h1>
          
          {errors.general && <div className={styles.error}>{errors.general}</div>}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="seu@email.com"
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
          />

          <Button type="submit" loading={mutation.isPending}>
            Entrar
          </Button>

          <p className={styles.link}>
            Não tem cuenta? <a href="/auth/register">Registre-se</a>
          </p>
        </form>
      </div>
    </Layout>
  )
}
