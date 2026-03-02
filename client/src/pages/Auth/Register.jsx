import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import { Input, Button } from '@/components/Form'
import { useRegister } from '@/hooks'
import styles from './Register.module.css'

export default function Register() {
  const navigate = useNavigate()
  const mutation = useRegister()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({ general: 'Preencha todos os campos' })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ general: 'As senhas não correspondem' })
      return
    }

    mutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (error) => {
        setErrors({ general: error.response?.data?.message || 'Erro ao registrar' })
      },
    })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Registro</h1>
          
          {errors.general && <div className={styles.error}>{errors.general}</div>}

          <Input
            label="Nome"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Seu nome"
          />

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

          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />

          <Button type="submit" loading={mutation.isPending}>
            Registrar
          </Button>

          <p className={styles.link}>
            Já tem cuenta? <a href="/auth/login">Faça login</a>
          </p>
        </form>
      </div>
    </Layout>
  )
}
