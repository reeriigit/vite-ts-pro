// src/views/web/ServicesPage.tsx
import React from 'react';

const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <p className="mb-4">
        We offer a wide range of services to cater to your needs. Our core services include:
      </p>
      <ul className="list-disc pl-6">
        <li>Web Development</li>
        <li>Mobile Application Development</li>
        <li>UI/UX Design</li>
        <li>Digital Marketing</li>
        <li>Consulting Services</li>
      </ul>
      <p className="mt-4">
        Get in touch with us to learn more about how we can help you achieve your business goals.
      </p>
    </div>
  );
};

export default ServicesPage;
