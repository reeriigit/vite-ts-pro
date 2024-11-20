// src/views/ProductTypeForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAddProductType } from '@/controllers/productTypeController'; 
import { ProductTypeData } from '@/models/ProductTypeModel';

const ProductTypeForm: React.FC = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductTypeData>({
    producttype_name: '',
    description: '',
    submncondt: 1,
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === 'storeId' || name === 'submncondt' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('storeId', String(productData.storeId));
    formData.append('producttype_name', productData.producttype_name);
    if (productData.description) formData.append('description', productData.description);
    if (productData.submncondt !== undefined) formData.append('submncondt', String(productData.submncondt));
    if (productImage) formData.append('producttype_image', productImage);

    try {
      await handleAddProductType(formData);
      setMessage('Product type saved successfully!');
      navigate('/shop/productTypeList');
    } catch (error) {
      setMessage('Failed to save product type.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Product Type</h2>
      {message && <p className="mb-4 text-center font-semibold">{message}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Product Type Name</label>
        <input
          type="text"
          name="producttype_name"
          value={productData.producttype_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Product Type Image</label>
        <input
          type="file"
          name="producttype_image"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Product Type</button>
    </form>
  );
};

export default ProductTypeForm;
