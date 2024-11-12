// src/views/web/ContactPage.tsx
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We would love to hear from you! Reach out to us via the following methods:
      </p>
      <ul>
        <li>Email: contact@ourcompany.com</li>
        <li>Phone: +1 (123) 456-7890</li>
        <li>Address: 123 Main Street, Anytown, USA</li>
      </ul>
    </div>
  );
};

export default ContactPage;
