// src/components/Layout.tsx
import React from 'react';
import Sidebar from './shop/Sidebar'; // นำเข้า Sidebar
import { Outlet } from 'react-router-dom'; // ใช้ Outlet เพื่อแสดงเนื้อหาของแต่ละหน้า

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-4">
        <Outlet /> {/* ใช้ Outlet เพื่อแสดงคอมโพเนนต์ตามเส้นทาง */}
      </div>
    </div>
  );
};

export default Layout;
