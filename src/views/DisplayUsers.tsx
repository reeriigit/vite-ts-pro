// src/views/DisplayUsers.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../models/UserModel';

const DisplayUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // จำลองการดึงข้อมูลผู้ใช้จากที่เก็บข้อมูล (เช่น จาก localStorage หรือฐานข้อมูล)
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {users.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Telephone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.telephone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default DisplayUsers;
