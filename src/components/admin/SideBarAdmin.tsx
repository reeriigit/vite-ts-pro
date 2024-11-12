// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const SideBarAdmin: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        My App
      </div>
      <ul className="mt-4 space-y-2">
      
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/admin/addusers" className="block">
          addusers
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/admin/listusers" className="block">
          listusers
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default SideBarAdmin;
