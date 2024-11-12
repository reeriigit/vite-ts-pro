// src/views/shop/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Card 1</h2>
          <p>Content for card 1...</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Card 2</h2>
          <p>Content for card 2...</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Card 3</h2>
          <p>Content for card 3...</p>
        </div>
      </div>

      <div className="mt-6">
        {/* Example chart or table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Data Overview</h2>
          <p>Example chart or table goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
