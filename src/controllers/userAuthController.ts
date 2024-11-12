// src/controllers/userAuthController.ts
import { loginUser } from '../services/authService';
import { UserAuth } from '../models/UserAuthModel';

export const handleLogin = async (credentials: UserAuth) => {
  console.log("Data before sending at userAuth:", credentials);
  try {
    const data = await loginUser(credentials);
    console.log("Data login response:", data);
    return data;
  } catch (error) {
    console.error('Login failed in controller:', error);
    throw error;
  }
};
