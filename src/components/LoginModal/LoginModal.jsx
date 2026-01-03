import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleClose = useCallback(() => {
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setIsLogin(true);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result?.success) {
          handleClose();
        } else {
          setError('E-mail ou senha inválidos!');
        }
      } else {
        const registerData = { name, email, password };
        const result = await register(registerData);
        if (result?.success) {
          setError('');
          setName('');
          setEmail('');
          setPassword('');
          setIsLogin(true);
        } else {
          setError('Erro ao cadastrar. Tente novamente.');
        }
      }
    } catch (err) {
      console.error('Erro no formulário:', err);
      setError('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={handleClose} aria-label="Fechar">
          ×
        </button>
        
        <div className="login-modal-header">
          <h2>{isLogin ? 'Login' : 'Criar Conta'}</h2>
          <p className="login-modal-subtitle">
            {isLogin 
              ? 'Bem-vindo de volta ao SerraBook! 📚' 
              : 'Crie sua conta e comece a explorar! 📖'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-modal-form">
          {error && <div className="login-modal-error">{error}</div>}

          {!isLogin && (
            <div className="login-modal-field">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="login-modal-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="login-modal-field">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-modal-submit"
            disabled={loading}
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <div className="login-modal-footer">
          <p>
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <button 
              type="button" 
              className="login-modal-switch"
              onClick={switchMode}
              disabled={loading}
            >
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

