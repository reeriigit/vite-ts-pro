// src/views/ProductTypeList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleDelProductType } from '@/controllers/productTypeController';
import { getProductType } from '@/controllers/productTypeController';
import { ProductTypeDataList } from '@/models/ProductTypeModel';

const ProductTypeList: React.FC = () => {
  const [productTypes, setProductTypes] = useState<ProductTypeDataList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await getProductType();
      console.log('product type2', response);
      setProductTypes(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch product types:', error);
      setError('Failed to load product types.');
      setLoading(false);
    }
  };

  const handleDelete = async (producttype_id: number) => {
    try {
      handleDelProductType(producttype_id);
      setProductTypes(productTypes.filter((product) => product.producttype_id !== producttype_id));
      alert('Product type deleted successfully.');
    } catch (error) {
      console.error('Failed to delete product type:', error);
      alert('Failed to delete product type.');
    }
  };

  if (loading) return <p className="text-[12px]">Loading...</p>;
  if (error) return <p className="text-[12px]">{error}</p>;

  return (
    <div className="container mx-auto px-4 text-[15px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[12px] font-bold">Product Types List</h1>
        <Link
          to="/shop/producttype/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-[12px]"
        >
          +
        </Link>
      </div>

      {productTypes.length > 0 ? (
        <table className="table-auto w-full bg-white shadow rounded text-[15px]">
          <thead>
            <tr>
              <th className="px-4 py-2 text-[12px]">ID</th>
              <th className="px-4 py-2 text-[12px]">Product Type Name</th>
              <th className="px-4 py-2 text-[12px]">Description</th>
              <th className="px-4 py-2 text-[12px]">Image</th>
              <th className="px-4 py-2 text-[12px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productTypes.map((productType) => (
              <tr key={productType.producttype_id}>
                <td className="border px-4 py-2 text-[12px]">{productType.producttype_id}</td>
                <td className="border px-4 py-2 text-[12px]">{productType.producttype_name}</td>
                <td className="border px-4 py-2 text-[12px]">{productType.description || '-'}</td>
                <td className="border px-4 py-2 text-[12px]">
                  {productType.producttype_image ? (
                    <img
                      src={`/api/src/uploads/images/producttypes/${productType.producttype_image}`}
                      alt={productType.producttype_name}
                      className="w-10 h-10 object-cover"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td className="border px-4 py-2 text-[12px]">
                  <Link
                    to={`/shop/producttype/edit/${productType.producttype_id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-[12px] mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(productType.producttype_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-[12px]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-[12px]">No product types found.</p>
      )}
    </div>
  );
};

export default ProductTypeList;
