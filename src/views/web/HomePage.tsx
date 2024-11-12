// src/views/web/HomePage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const HomePage: React.FC = () => {
  // Access data from useAuth
  const { UserContext } = useAuth();
  console.log("User datas:", UserContext);

  const [search, setSearch] = useState<string>('');

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container mx-auto px-40 py-1">
      {/* Display logged-in user's email or 'Guest' if not available */}
      <h2 className="text-xl font-bold mb-4">
        Welcome, {UserContext ? UserContext.email : 'Guest'}
      </h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-full"
      />
    </div>
  );
};

export default HomePage;
