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
import ProductTypeList from '@/views/shop/ProductType/ProductTypeList';
import ProductTypeEditForm from '@/views/shop/ProductType/ProductTypeEditForm';
import ProductForm from '@/views/shop/Product/ProductForm';
import ProductList from '@/views/shop/Product/ProductList';
import ProductUpdateForm from '@/views/shop/Product/ProductUpdateForm';
import PromotionForm from '@/views/shop/Promotions/PromotionForm';
import PromotionList from '@/views/shop/Promotions/PromotionList';
import PromotionEditForm from '@/views/shop/Promotions/PromotionEditForm';



const ShopRoutes: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* กำหนดความกว้างของ Sidebar ให้เป็น 30% */}
      <div className="w-2/12 border-r border-gray-300 bg-blue-50 ">
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
          <Route path="producttype/add" element={<ProductTypeForm/>} />
          <Route path="productTypeList" element={<ProductTypeList/>} />
          <Route path="producttype/edit/:producttype_id" element={<ProductTypeEditForm/>} />
          <Route path="ProductForm" element={<ProductForm/>} />
          <Route path="ProductList" element={<ProductList/>} />
          <Route path="ProductUpdateForm/:product_id" element={<ProductUpdateForm/>} />
          <Route path="PromotionForm" element={<PromotionForm/>} />
          <Route path="/promotionslist" element={<PromotionList/>} />
          <Route path="/PromotionEditForm/:promo_id" element={<PromotionEditForm/>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default ShopRoutes;

