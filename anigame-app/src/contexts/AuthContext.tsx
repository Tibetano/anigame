import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  gender: string;
  dateOfBirth: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string, redirectTo?: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<User | false>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('anigame_token');
    const storedUser = localStorage.getItem('anigame_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, redirectTo?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
      const apiPort = import.meta.env.VITE_API_PORT || '8080';
      const response = await fetch(`http://${apiHost}:${apiPort}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        setToken(data.access_token);
        
        localStorage.setItem('anigame_token', data.access_token);
        localStorage.setItem('anigame_refresh_token', data.refresh_token);
        
        // Fetch user profile data
        const profileResponse = await fetch(`http://${apiHost}:${apiPort}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
          },
        });

        if (profileResponse.ok) {
          const userData = await profileResponse.json();
          setUser(userData);
          localStorage.setItem('anigame_user', JSON.stringify(userData));
        }
        
        // Store redirect URL for after login
        if (redirectTo) {
          localStorage.setItem('anigame_redirect', redirectTo);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<User | false> => {
    try {
      setIsLoading(true);
      const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
      const apiPort = import.meta.env.VITE_API_PORT || '8080';
      const response = await fetch(`http://${apiHost}:${apiPort}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const registeredUser = await response.json();
        return registeredUser;
      }
      return false;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!token) return false;
    
    try {
      setIsLoading(true);
      const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
      const apiPort = import.meta.env.VITE_API_PORT || '8080';
      const response = await fetch(`http://${apiHost}:${apiPort}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('anigame_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('anigame_token');
    localStorage.removeItem('anigame_user');
    localStorage.removeItem('anigame_refresh_token');
  };

  const value = {
    user,
    token,
    login,
    logout,
    register,
    updateUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};