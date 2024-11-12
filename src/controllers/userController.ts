// src/controllers/userController.ts
import { DataUserContext } from '../models/UserModel';
import { fetchUser } from '../services/usersService';
import { addUser } from '@/services/usersService';




export const getUser = async (token: string): Promise<DataUserContext | null> => {
  return await fetchUser(token); // Pass the token to fetchUser
};

export const handleAddUser = async (userData: {
  referral_code: string;
  referred_by: string;
  username: string;
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone_number: string;
  usertype_id: number;
}) => {
  try {
    const response = await addUser(userData);
    return response;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
