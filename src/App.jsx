
import { Router } from './Router/Router';
import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { useAuth } from './contexts/AuthContext';

function App() {
  const { logout } = useAuth();

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true'
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    }
  }, [])

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="app">
      <Header onLogout={handleLogout} />
      <main className="app-main">
        <div className="app-container">
          <Router />
        </div>
      </main>
    </div>
  )
}

export default App;