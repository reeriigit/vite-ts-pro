// src/routes/ShopRoutes.tsx
import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';

import DisplayUsers from '../views/DisplayUsers';
import SomeComponent from '../views/SomeComponent';
import Sidebar from '../components/shop/Sidebar'; // นำเข้า Sidebar
import StoresList from '@/views/shop/Store/StoresList';
import UpdateStore from '@/views/shop/Store/UpdateStore';
import StoreForm from '@/views/shop/Store/StoreForm';
import ProductTypeForm from '@/views/shop/ProductType/ProductTypeForm';



const ShopRoutes: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* กำหนดความกว้างของ Sidebar ให้เป็น 30% */}
      <div className="w-2/12 bg-gray-800">
        <Sidebar />
      </div>
      {/* กำหนดความกว้างของเนื้อหาให้เป็น 70% */}
      <div className="w-10/12 flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} /> {/* หน้าแรกของร้านค้า */}
          <Route path="about" element={<About />} />
          <Route path="display-users" element={<DisplayUsers />} />
          <Route path="somecomponent" element={<SomeComponent />} />
          <Route path="storelist" element={<StoresList/>} />
          <Route path="updatestore" element={<UpdateStore/>} />
          <Route path="storeForm" element={<StoreForm/>} />
          <Route path="productTypeForm" element={<ProductTypeForm/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default ShopRoutes;

