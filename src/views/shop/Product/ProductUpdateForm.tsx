// src/views/ProductUpdateForm.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductType } from '@/controllers/productTypeController';

interface ProductData {
  product_id: number;
  name: string;
  product_type_id: number;
  description?: string;
  price: number;
  cost_price: number;
  status_id: number;
  images?: string[];
}

interface ProductTypeData {
  producttype_id: number;
  producttype_name: string;
}

const ProductUpdateForm: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [productTypeData, setProductTypeData] = useState<ProductTypeData[]>([]);

  useEffect(() => {
    // Fetch product data
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/products/${product_id}`, { withCredentials: true });
        if (response.data.data) {
          setProductData(response.data.data);
        } else {
          setMessage('Product not found.');
        }
      } catch (error) {
        console.error('Failed to load product data:', error);
        setMessage('Failed to fetch product details.');
      }
    };

    // Fetch product types
    const fetchProductTypes = async () => {
      try {
        const response = await getProductType();
        setProductTypeData(response);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductData();
    fetchProductTypes();
  }, [product_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) =>
      prevData
        ? {
            ...prevData,
            [name]: ['price', 'cost_price', 'status_id', 'product_type_id'].includes(name) ? Number(value) : value,
          }
        : null
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productData) return;

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('product_type_id', String(productData.product_type_id));
    formData.append('price', String(productData.price));
    formData.append('cost_price', String(productData.cost_price));
    formData.append('status_id', String(productData.status_id));
    if (productData.description) formData.append('description', productData.description);
    productImages.forEach((image) => formData.append('images', image));

    try {
      const response = await axios.put(`/api/products/update/${product_id}`, formData, { withCredentials: true });
      console.log('Product updated successfully:', response);
      setMessage('Product updated successfully!');
      navigate('/shop/ProductList');
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Failed to update product.');
    }
  };

  if (!productData) return <p>Loading product details...</p>;

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>

      {message && <p className="mb-4 text-center font-semibold">{message}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Product Name</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Product Type</label>
        <select
          name="product_type_id"
          value={productData.product_type_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">{productData.product_type_id}</option>
          {productTypeData.map((type) => (
            <option key={type.producttype_id} value={type.producttype_id}>
              {type.producttype_name}
            </option>
          ))}
        </select>
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
        <label className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Cost Price</label>
        <input
          type="number"
          name="cost_price"
          value={productData.cost_price}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Status ID</label>
        <input
          type="number"
          name="status_id"
          value={productData.status_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Product Images</label>
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
          multiple
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </form>
  );
};

export default ProductUpdateForm;
