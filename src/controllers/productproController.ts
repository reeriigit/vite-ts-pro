// src/controllers/productproController.ts
import { fetchProducts } from '../services/productproService';
import { ProductPro } from '../models/ProductProModel';

export const getProducts = async (): Promise<ProductPro[]> => {
  return await fetchProducts(); // เรียกใช้ฟังก์ชันโดยไม่ต้องส่ง search
};
