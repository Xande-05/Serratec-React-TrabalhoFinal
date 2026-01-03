import { createContext, useState, useContext, useEffect } from "react";
import mockApi from "../services/MockApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("@EbookStore:user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await mockApi.get(`/users?email=${encodeURIComponent(email)}`);
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const user = data.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userData } = user;
          setUser(userData);
          localStorage.setItem("@EbookStore:user", JSON.stringify(userData));
          return { success: true };
        } else {
          alert("E-mail ou senha inválidos!");
          return { success: false };
        }
      } else {
        alert("Usuário não encontrado!");
        return { success: false };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      
      if (error.response) {
        if (error.response.status === 404) {
          alert("Serviço não encontrado. Verifique a configuração do MockAPI.");
        } else if (error.response.status === 500) {
          alert("Erro no servidor. Verifique se o MockAPI está funcionando corretamente.");
        } else {
          alert(`Erro ao fazer login: ${error.response.status}`);
        }
      } else if (error.request) {
        alert("Não foi possível conectar ao servidor. Verifique sua conexão com a internet.");
      } else {
        alert("Erro ao processar a requisição de login.");
      }
      
      return { success: false };
    }
  };

  const register = async (registerData) => {
    await mockApi.post("/users", registerData);
    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@EbookStore:user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};