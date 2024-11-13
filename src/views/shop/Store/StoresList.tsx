// src/views/StoresList.tsx
import React, { useEffect, useState } from 'react';
import { getUserStores } from '../../../controllers/storeController';

interface Store {
  storeId: number;
  user_id: number;
  logo: string;
  storeName: string;
  storeType: string;
  storeDes?: string;
  style?: string;
  province?: string;
  phone?: string;
  address?: string;
  status: boolean;
}

const StoresList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getUserStores();
        console.log("data store",data)
        setStores(data);
      } catch (err) {
        setError('Failed to load stores');
      } finally {
        setLoading(false);
      }
    };
    loadStores();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Stores List</h1>
      {stores.length > 0 ? (
        <table className="table-auto w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Store Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Province</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.storeId}>
                <td className="border px-4 py-2">{store.storeName}</td>
                <td className="border px-4 py-2">{store.storeType}</td>
                <td className="border px-4 py-2">{store.storeDes || '-'}</td>
                <td className="border px-4 py-2">{store.province || '-'}</td>
                <td className="border px-4 py-2">{store.status ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stores found for this user.</p>
      )}
    </div>
  );
};

export default StoresList;
