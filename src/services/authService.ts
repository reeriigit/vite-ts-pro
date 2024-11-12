// src/services/authService.ts
import axios from 'axios';
import { UserAuth } from '../models/UserAuthModel';

export const loginUser = async (credentials: UserAuth) => {
  console.log("Data before sending at authService:", credentials);
  try {
    const response = await axios.post(`/api/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error in loginUser service:', error);
    throw error;
  }
};
