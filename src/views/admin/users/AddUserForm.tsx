// src/views/AddUserForm.tsx
import React, { useState } from 'react';
import { handleAddUser } from '@/controllers/userController';

const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    referral_code: '',
    referred_by: '',
    username: '',
    email: '',
    password: '',
    fullname: '',
    address: '',
    phone_number: '',
    usertype_id: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'usertype_id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await handleAddUser(formData);
      console.log('User added successfully:', response);
      alert('User added successfully');
      setFormData({
        referral_code: '',
        referred_by: '',
        username: '',
        email: '',
        password: '',
        fullname: '',
        address: '',
        phone_number: '',
        usertype_id: 1,
      });
    } catch (error) {
      alert('Failed to add user');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="referral_code"
          placeholder="Referral Code"
          value={formData.referral_code}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="referred_by"
          placeholder="Referred By"
          value={formData.referred_by}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <select
          name="usertype_id"
          value={formData.usertype_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value={1}>User Type 1</option>
          <option value={2}>User Type 2</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
