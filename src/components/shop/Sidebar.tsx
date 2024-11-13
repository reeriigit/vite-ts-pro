// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        My App
      </div>
      <ul className="mt-4 space-y-2">
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/about" className="block">
            About
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/display-users" className="block">
            Display Users
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-700 rounded-md">
          <Link to="/shop/updatestore" className="block">
            Update Users
          </Link>
        </li>
        
    
        
      </ul>
    </div>
  );
};

export default Sidebar;
