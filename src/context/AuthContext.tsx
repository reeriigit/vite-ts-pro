// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { DataUserContext,DataStoreContext } from '../models/UserModel';
import { fetchUser } from '@/services/usersService';
import { fetchUserStores } from '@/services/storeService';

interface AuthContextType {
  login: () => void;
  logout: () => void;
  UserContext: DataUserContext | null;
  setUserContext: React.Dispatch<React.SetStateAction<DataUserContext | null>>;
  StoreContext: DataStoreContext | null;
  setStoreContext: React.Dispatch<React.SetStateAction<DataStoreContext | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [UserContext, setUserContext] = useState<DataUserContext | null>(null);
  const [StoreContext, setStoreContext] = useState<DataStoreContext | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      console.log("ovsndpvundpi")
      if (!UserContext) {
        try {
          const userDatas = await fetchUser();
          const storeDatas = await fetchUserStores();
          setUserContext(userDatas);
          setStoreContext(storeDatas)
          console.log("Fetched user data:", userDatas);
          console.log("Fetched user data:", storeDatas);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUserContext(null);
        }
      }
    };
    loadUserData();
  }, []);

  const login = () => {
    console.log('Logged in successfully');
  };

  const logout = () => {
    setUserContext(null);
    Cookies.remove('token'); // Remove token from cookies on logout
    console.log('Logged out and token removed from cookies');
  };

  return (
    <AuthContext.Provider value={{ login, logout, UserContext, setUserContext,StoreContext,setStoreContext }}>
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
