// src/services/storeService.ts
import axios from 'axios';

export const fetchUserStores = async () => {
  try {
    const response = await axios.get('/api/stores/user', { withCredentials: true });
    console.log("facthdatastore",response.data.data[0])
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching stores data:", error);
    throw new Error('Failed to load stores');
  }
};


export const fetchStoreById = async (storeId: number) => {
  try {
    console.log('Fetching store:2', storeId);
    const response = await axios.get(`/api/stores/store/${storeId}`, { withCredentials: true });
    console.log('res data store 3 ',response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching store data:', error);
    throw new Error('Failed to fetch store data');
  }
};

export const updateStore = async (storeId: number, storeData: any) => {
  try {
    console.log('Updating store:', storeId);
    const response = await axios.put(`/api/stores/update/${storeId}`, storeData, { withCredentials: true });
    return response.data.data;
  } catch (error) {
    console.error('Error updating store data:', error);
    throw new Error('Failed to update store data');
  }
};
