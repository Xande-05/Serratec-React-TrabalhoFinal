import { useState, useEffect } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(darkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setError('Por favor, insira um email válido')
      return
    }

    onLogin({ email, password })
  }

  return (
    <div className="login-container">
      <button 
        className="login-theme-toggle" 
        onClick={toggleDarkMode}
        aria-label="Alternar modo escuro"
        title={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">🗻SerraBook 📚 </h1>
          <p className="login-subtitle">Bem-vindo ao nosso site!</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <p className="login-footer">
          Não tem uma conta? <a href="#" className="login-link">Cadastre-se</a>
        </p>
      </div>
    </div>
  )
}

export default Login

