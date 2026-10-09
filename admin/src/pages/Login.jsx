import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth.js'
import { appConfig } from '../constants/navigation.js'

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const requestedPath = location.state?.from?.pathname || '/dashboard'
  const from = requestedPath.replace(/^\/admin(?=\/|$)/, '') || '/dashboard'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const onSubmit = async (values) => {
    setIsSubmitting(true)

    try {
      await login(values)
      toast.success('Welcome back')
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <Helmet>
        <title>Login | {appConfig.name} Admin</title>
      </Helmet>
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark large">{appConfig.shortName}</div>
          <p>{appConfig.name}</p>
          <h1>Lead CRM</h1>
          <span>Secure access for Super Admin only.</span>
        </div>

        <form className="login-card" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <small className="field-error">{errors.email.message}</small>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <small className="field-error">{errors.password.message}</small>}
          </div>
          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
