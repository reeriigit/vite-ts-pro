// src/views/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products/selectall', { withCredentials: true });
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products.');
      setLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`/api/products/delete/${productId}`, { withCredentials: true });
      setProducts(products.filter((product) => product.product_id !== productId));
      alert('Product deleted successfully.');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 text-[12px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[12px] font-bold">Product List</h1>
        <Link
          to="/shop/ProductForm"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-[12px]"
        >
          +
        </Link>
      </div>
      
      {products.length > 0 ? (
        <table className="table-auto w-full bg-white shadow rounded text-[12px]">
          <thead>
            <tr>
              <th className="px-4 py-2 text-[12px]">Product ID</th>
              <th className="px-4 py-2 text-[12px]">Product Name</th>
              <th className="px-4 py-2 text-[12px]">Product Type ID</th>
              <th className="px-4 py-2 text-[12px]">Description</th>
              <th className="px-4 py-2 text-[12px]">Price</th>
              <th className="px-4 py-2 text-[12px]">Cost Price</th>
              <th className="px-4 py-2 text-[12px]">Status ID</th>
              <th className="px-4 py-2 text-[12px]">Images</th>
              <th className="px-4 py-2 text-[12px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td className="border px-4 py-2 text-[12px]">{product.product_id}</td>
                <td className="border px-4 py-2 text-[12px]">{product.name}</td>
                <td className="border px-4 py-2 text-[12px]">{product.product_type_id}</td>
                <td className="border px-4 py-2 text-[12px]">{product.description || '-'}</td>
                <td className="border px-4 py-2 text-[12px]">{product.price}</td>
                <td className="border px-4 py-2 text-[12px]">{product.cost_price}</td>
                <td className="border px-4 py-2 text-[12px]">{product.status_id}</td>
                <td className="border px-4 py-2 text-[12px]">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={`/api/src/uploads/images/products/${image}`}
                        alt={product.name}
                        className="w-10 h-10 object-cover inline-block m-1"
                      />
                    ))
                  ) : (
                    '-'
                  )}
                </td>
                <td className="border px-4 py-2 text-[12px]">
                  <Link
                    to={`/shop/ProductUpdateForm/${product.product_id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-[12px] mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.product_id)}
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
        <p className="text-[12px]">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
