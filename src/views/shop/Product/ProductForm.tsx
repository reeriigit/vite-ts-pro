// src/views/ProductForm.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductTypeDataList } from '@/models/ProductTypeModel';
import { getProductType } from '@/controllers/productTypeController';

interface ProductData {
  name: string;
  product_type_id: number;
  description?: string;
  price: number;
  cost_price: number;
  status_id: number;
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    product_type_id: 0,
    description: '',
    price: 0,
    cost_price: 0,
    status_id: 1,
  });
  const [productImages, setProductImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [productTypeData, setProductTypeData] = useState<ProductTypeDataList[]>([]);

  useEffect(() => {
    // Fetch product types when the component mounts
    const fetchProductTypes = async () => {
      try {
        const response = await getProductType();
        setProductTypeData(response);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };
    fetchProductTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === 'product_type_id' || name === 'status_id' || name === 'price' || name === 'cost_price'
        ? Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setProductImages(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('product_type_id', String(productData.product_type_id));
    formData.append('price', String(productData.price));
    formData.append('cost_price', String(productData.cost_price));
    formData.append('status_id', String(productData.status_id));
    if (productData.description) formData.append('description', productData.description);
    productImages.forEach((image) => formData.append('images', image));

    try {
      const response = await axios.post('/api/products/insert', formData, { withCredentials: true });
      setMessage('Product saved successfully!');
      navigate('/shop/ProductList');
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage('Failed to save product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

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

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Product</button>
    </form>
  );
};

export default ProductForm;
