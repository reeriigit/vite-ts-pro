// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { token, logout } = useAuth(); // ใช้ logout และ token จาก useAuth โดยตรง

  return (
    <nav className="border-b-4 border-yellow-500 text-gray-500">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            My App
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gray-300">
              Shop
            </Link>
          </li>
          {token ? (
            <li>
              <button
                onClick={logout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
