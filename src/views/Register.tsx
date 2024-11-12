// src/views/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAddUser } from '@/controllers/userController';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    referral_code: '6513032',
    referred_by: '', // ค่า fix ที่กำหนดไว้
    username: '',
    email: '',
    password: '',
    fullname: '',
    address: '',
    phone_number: '',
    usertype_id: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'usertype_id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData); // แสดงข้อมูลที่เพิ่มผ่าน console

    try {
      const response = await handleAddUser(formData);
      if (response) {
        alert('Registration successful!');
        navigate('/login'); // ไปหน้า login หลังจากสมัครสมาชิกสำเร็จ
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="referred_by"
          placeholder="Referred by Code"
          value={formData.referred_by}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          required
        />
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        
      
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
