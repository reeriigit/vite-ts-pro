// src/routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../views/Login/Login';
import Register from '../views/Register';
import WebRoutes from './WebRoutes'; // นำเข้า WebRoutes
import ShopRoutes from './ShopRoutes'; // นำเข้า ShopRoutes
import AdminRoutes from './AdminRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* เส้นทางที่ไม่ต้องใช้ Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* เส้นทางสำหรับหน้าเว็บหลัก */}
        <Route path="/*" element={<WebRoutes />} />

        {/* เส้นทางสำหรับร้านค้า */}
        <Route path="/shop/*" element={<ShopRoutes />} />

        {/* เส้นทางสำหรับผู้ดูแลระบบ */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* เส้นทางที่ไม่ได้กำหนดไว้ */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
