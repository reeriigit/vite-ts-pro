// src/routes/WebRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/web/HomePage';
import AboutPage from '../views/web/AboutPage';
import ContactPage from '../views/web/ContactPage';
import ServicesPage from '../views/web/ServicesPage';
import Navbar from '../components/Navbar'; // นำเข้า Navbar

const WebRoutes: React.FC = () => {
  return (
    <div>
      <Navbar /> {/* แสดง Navbar คงที่ในทุกหน้า */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </div>
  );
};

export default WebRoutes;
