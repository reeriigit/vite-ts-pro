// src/services/usersService.ts
import axios from 'axios';
import { DataUserContext } from '@/models/UserModel';


export const fetchUser = async (token: string): Promise<DataUserContext | null> => {

  try {
    const response = await axios.get('/api/users/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    console.log("Fetched user data:", response.data.data);


    if (response.data.success) {
      return response.data.data; // Returning specific user data
    } else {
      console.error('Unexpected response format:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


export const addUser = async (userData: {
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
    // ใช้เส้นทาง `/api/users/data` ให้ตรงกับ fetchUser
    const response = await axios.post('/api/users/create', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
