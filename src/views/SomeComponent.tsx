// src/views/SomeComponent.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SomeComponent: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {auth.user ? (
        <p>Welcome, {auth.user}!</p>
      ) : (
        <button onClick={() => auth.login('User123')}>Login</button>
      )}
      {auth.user && <button onClick={auth.logout}>Logout</button>}
    </div>
  );
};

export default SomeComponent;
