// src/views/UpdateStore.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStoreById, updateStore } from '@/services/storeService';
import { useAuth } from '@/context/AuthContext';

interface Store {
  storeId: number;
  user_id: number;
  logo: string | null;
  storeName: string;
  storeType: string;
  storeDes?: string;
  style?: string;
  province?: string;
  phone?: string;
  address?: string;
  status: boolean;
}

const UpdateStore: React.FC = () => {
  const { StoreContext } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const storeId = StoreContext?.storeId;

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await fetchStoreById(Number(storeId));
        setStore(storeData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch store data:", err);
        setError('Failed to load store');
        setLoading(false);
      }
    };
    if (storeId) {
      fetchStore();
    }
  }, [storeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStore(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleUpdate = async () => {
    if (store) {
      try {
        await updateStore(Number(storeId), store);
        alert('Store updated successfully');
        navigate('/stores');
      } catch (err) {
        console.error("Failed to update store data:", err);
        setError('Failed to update store');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Update Store</h1>
      {store && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="storeName">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={store.storeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="storeType">Store Type</label>
            <input
              type="text"
              name="storeType"
              value={store.storeType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="storeDes">Store Description</label>
            <textarea
              name="storeDes"
              value={store.storeDes || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="style">Style</label>
            <input
              type="text"
              name="style"
              value={store.style || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="province">Province</label>
            <input
              type="text"
              name="province"
              value={store.province || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={store.phone || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={store.address || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="status">Status</label>
            <input
              type="checkbox"
              name="status"
              checked={store.status}
              onChange={() => setStore(prev => prev ? { ...prev, status: !prev.status } : null)}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">Active</span>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Store</button>
        </form>
      )}
    </div>
  );
};

export default UpdateStore;
