// src/routes/AdminRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import UsersList from '@/views/admin/users/UsersList';
import AddUserForm from '@/views/admin/users/AddUserForm';
import SideBarAdmin from '@/components/admin/SideBarAdmin';

const AdminRoutes: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* กำหนดความกว้างของ Sidebar ให้เป็น 30% */}
      <div className="w-2/12 bg-gray-800">
        <SideBarAdmin />
      </div>
      {/* กำหนดความกว้างของเนื้อหาให้เป็น 70% */}
      <div className="w-10/12 flex-grow p-4">
        <Routes>
          {/* <Route path="listusers" element={<UsersList />} /> */}
          <Route path="addusers" element={<AddUserForm />} />
          
          {/* เส้นทางที่ไม่ได้กำหนดไว้ใน AdminRoutes */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
