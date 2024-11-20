// src/services/productTypeService.ts
import axios from 'axios';

export const fetchProductTypes = async () => {
  const response = await axios.get('/api/product-types/selectofstore ', { withCredentials: true });
  return response.data.data;
};

export const deleteProductTypeById  = async (producttype_id: number) => {
  await axios.delete(`/api/product-types/deletes/${producttype_id}`, { withCredentials: true });
};



// ฟังก์ชันสำหรับเพิ่มประเภทสินค้า
export const addProductType = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/product-types/insert', formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving product type:', error);
    throw error;
  }
};

