// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className=" w-64  text-black fixed ">
      <div className="p-6 text-2xl font-bold border-b ">
        My App
      </div>
      <ul className="mt-4 space-y-2">
        <li className="p-4 hover:bg-gray-700 hover:text-white rounded-md">
          <Link to="/shop/about" className="block text-[12px]">
            About
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/display-users" className="block text-[12px]">
            Display Users
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/updatestore" className="block text-[12px]">
            Update Users
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/productTypeList" className="block text-[12px]">
            productTypeList
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/ProductList" className="block text-[12px]">
            ProductList
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/promotionslist" className="block text-[12px]">
            promotionslist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
