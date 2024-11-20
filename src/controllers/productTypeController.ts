// src/controllers/productTypeController.ts
import { addProductType,deleteProductTypeById,fetchProductTypes } from "@/services/productTypeService";

// ฟังก์ชันสำหรับจัดการการบันทึกข้อมูลประเภทสินค้า
export const handleAddProductType = async (formData: FormData) => {
  try {
    const response = await addProductType(formData);
    return response;
  } catch (error) {
    console.error('Failed to add product type:', error);
    throw error;
  }
};

export const handleDelProductType = async (producttype_id: number) => {
    try {
      const response = await deleteProductTypeById(producttype_id); // Wait for the delete response
      return response;
    } catch (error) {
      console.error('Failed to delete product type:', error);
      throw error;
    }
  };

export const getProductType = async ()=>{
    try{
        const producttype = await fetchProductTypes();
        return producttype;
    }catch(error){
        console.log('Erorr in getProduct Type',error);
        throw error;
    }
};