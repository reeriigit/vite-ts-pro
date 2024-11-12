// src/services/productproService.ts
import axios from 'axios';
import { ProductPro } from '../models/ProductProModel';

export const fetchProducts = async (): Promise<ProductPro[]> => {
  try {
    // เรียก API โดยไม่ใช้ search ใน URL
    const response = await axios.get('/');

    console.log("data pro ", response.data);

    // ตรวจสอบว่า response เป็น JSON และเป็นอาร์เรย์
    if (typeof response.data === 'object' && Array.isArray(response.data)) {
      console.log("Data is an array, returning data.");
      return response.data;
    } else {
      console.error('Unexpected response format:', response.data);
      return []; // ส่งคืนอาร์เรย์ว่างหากข้อมูลไม่ถูกต้อง
    }
  } catch (error) {
    // แสดงข้อผิดพลาดอย่างละเอียดใน console
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
