import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/cartContexts';
import './Header.css';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const userEmail = user?.email || user?.name || 'Usuário';
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">📚 SerraBook</h1>
        <button
          className={`header-hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="header-link" onClick={closeMenu}>Home</Link>
          <Link to="/cart" className="header-link cart-link" onClick={closeMenu}>
            Carrinho {isAuthenticated && `(${itemCount})`}
          </Link>
          <Link to="/sobre" className="header-link" onClick={closeMenu}>Sobre</Link>
          <button 
            className="header-theme-toggle" 
            onClick={toggleDarkMode}
            aria-label="Alternar modo escuro"
            title={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          {isAuthenticated ? (
            <div className="header-user">
              <span className="header-email">{userEmail}</span>
              <button className="header-logout" onClick={() => { handleLogout(); closeMenu(); }}>
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="header-link" onClick={closeMenu}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
