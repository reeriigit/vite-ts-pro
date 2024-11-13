// src/services/usersService.ts
import axios from 'axios';
import { DataUserContext } from '@/models/UserModel';

// src/services/usersService.ts



export const fetchUser = async (): Promise<DataUserContext | null> => {
  try {
    const response = await axios.get('/api/users/data', {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    console.log("Fetched user data:", response.data.data);

    if (response.data.success) {
      return response.data.data;
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
    const response = await axios.post('/api/users/create', userData, {
      withCredentials: true, // Include withCredentials here if needed
    });
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
