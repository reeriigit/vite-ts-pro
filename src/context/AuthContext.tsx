// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Token, DataUserContext } from '../models/UserModel';
import { fetchUser } from '@/services/usersService';

interface AuthContextType {
  token: Token | null;
  login: (token: Token) => void;
  logout: () => void;
  UserContext: DataUserContext | null;
  setUserContext: React.Dispatch<React.SetStateAction<DataUserContext | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<Token | null>(() => {
    try {
      const storedUser = localStorage.getItem('userToken');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const [UserContext, setUserContext] = useState<DataUserContext | null>(null);

  // Update UserContext when token changes
  useEffect(() => {
    // Only fetch data if UserContext is null and token is available
    const loadUserData = async () => {
      if (token && !UserContext) {
        try {
          const userDatas = await fetchUser(token);
          setUserContext(userDatas);
          console.log("Fetched user data:", userDatas);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUserContext(null); // Reset UserContext on error
        }
      }
    };
    loadUserData();
  }, [token]); // Remove UserContext from the dependency array
  

  const login = (token: Token) => {
    setToken(token);
    localStorage.setItem('userToken', JSON.stringify(token));
  };

  const logout = () => {
    setToken(null);
    setUserContext(null); // Reset UserContext on logout
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, UserContext, setUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
