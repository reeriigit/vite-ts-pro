// src/views/StoreForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface StoreData {
  storeName: string;
  storeType: number;
  storeDes?: string;
  style: number;
  province?: string;
  phone?: string;
  address?: string;
  status: number;
}

const StoreForm: React.FC = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: '',
    storeType: 0,
    style: 0,
    status: 1,
    storeDes: '',
    province: '',
    phone: '',
    address: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null); // State for logo file
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      [name]: name === 'storeType' || name === 'style' || name === 'status' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data
    formData.append('storeName', storeData.storeName);
    formData.append('storeType', storeData.storeType.toString());
    formData.append('style', storeData.style.toString());
    formData.append('status', storeData.status.toString());
    if (storeData.storeDes) formData.append('storeDes', storeData.storeDes);
    if (storeData.province) formData.append('province', storeData.province);
    if (storeData.phone) formData.append('phone', storeData.phone);
    if (storeData.address) formData.append('address', storeData.address);

    // Append file data
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      const response = await axios.post('/api/stores/insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        alert('Store created successfully');
        navigate('/stores');
      } else {
        setError('Failed to create store');
      }
    } catch (err) {
      console.error('Error creating store:', err);
      setError('Error creating store');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Store</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Store Name</label>
        <input
          type="text"
          name="storeName"
          value={storeData.storeName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Store Type</label>
        <input
          type="number"
          name="storeType"
          value={storeData.storeType}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="storeDes"
          value={storeData.storeDes}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Style</label>
        <input
          type="number"
          name="style"
          value={storeData.style}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Province</label>
        <input
          type="text"
          name="province"
          value={storeData.province}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={storeData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Address</label>
        <textarea
          name="address"
          value={storeData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <input
          type="number"
          name="status"
          value={storeData.status}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Logo (Image)</label>
        <input
          type="file"
          name="logo"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Store</button>
    </form>
  );
};

export default StoreForm;
