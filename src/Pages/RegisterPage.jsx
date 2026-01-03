import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { register } = useAuth(); 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const registerData = {
      name,
      email,
      password,
    };
    const result = await register(registerData);
    if (result?.success) {
      navigate("/login");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <div className="register-link">
          <p>
            Já tem uma conta? <Link to="/login">Faça o login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};