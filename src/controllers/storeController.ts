// src/controllers/storeController.ts
import { fetchUserStores } from '../services/storeService';
// src/controllers/storeController.ts
import { fetchStoreById, updateStore } from '../services/storeService';

export const getUserStores = async () => {
  try {
    const stores = await fetchUserStores();
    return stores;
  } catch (error) {
    console.error("Error in getUserStores:", error);
    throw error;
  }
};



export const getStoreData = async (storeId: number) => {
  return await fetchStoreById(storeId);
};

export const handleStoreUpdate = async (storeId: number, storeData: any) => {
  return await updateStore(storeId, storeData);
};
