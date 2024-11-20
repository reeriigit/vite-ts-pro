// src/views/ProductTypeEditForm.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductTypeData } from '@/models/ProductTypeModel';
const ProductTypeEditForm: React.FC = () => {
  const { producttype_id } = useParams<{ producttype_id: string }>();
  const [productData, setProductData] = useState<ProductTypeData | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/product-types/${producttype_id}`, { withCredentials: true });
        setProductData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch product type:', error);
        setMessage('Failed to load product type data.');
      }
    };
    fetchProductData();
  }, [producttype_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('producttype_name', productData?.producttype_name || '');
    formData.append('description', productData?.description || '');
    formData.append('submncondt', String(productData?.submncondt || ''));
    if (newImage) formData.append('producttype_image', newImage);

    try {
      await axios.put(`/api/product-types/update/${producttype_id}`, formData, { withCredentials: true });
      setMessage('Product type updated successfully!');
      navigate('/shop/productTypeList'); // Navigate back to the product list page
    } catch (error) {
      console.error('Error updating product type:', error);
      setMessage('Failed to update product type.');
    }
  };

  if (!productData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Product Type</h2>

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
          value={productData.description || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Submncondt</label>
        <input
          type="number"
          name="submncondt"
          value={productData.submncondt || ''}
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
        {productData.producttype_image && !newImage && (
          <img
            src={`/api/src/uploads/images/producttypes/${productData.producttype_image}`}
            alt={productData.producttype_name}
            className="mt-4 w-20 h-20 object-cover"
          />
        )}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product Type</button>
    </form>
  );
};

export default ProductTypeEditForm;
