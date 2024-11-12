// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="text-blue-400 hover:underline mx-2">About</a>
          <a href="/contact" className="text-blue-400 hover:underline mx-2">Contact</a>
          <a href="/privacy-policy" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
