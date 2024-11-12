// // src/views/shop/Users.tsx
// import React, { useState, useEffect } from 'react';
// import { User } from '@/models/UserModel';
// import { getUser } from '@/controllers/userController';
// import { useAuth } from '../../../context/AuthContext';


// const UsersList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const { token } = useAuth(); // Get token from context

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         console.log("samree token",token)
//         if (token) {
//           const user = await getUser(token); // Pass the token directly
//           if (user) {
//             setUsers([user]); // Set the user data if available
//           }
//         } else {
//           console.error('No token found');
//         }
//       } catch (error) {
//         console.error('Error loading user:', error);
//       }
//     };

//     loadUser();
//   }, [token]);

//   const handleRowClick = (user: User) => {
//     setSelectedUser(user);
//   };

//   const handleClosePopup = () => {
//     setSelectedUser(null);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">User List</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full bg-white shadow rounded">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2">Username</th>
//               <th className="px-4 py-2">Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr
//                 key={user.user_id}
//                 onClick={() => handleRowClick(user)}
//                 className="cursor-pointer hover:bg-gray-100"
//               >
//                 <td className="border px-4 py-2">{user.username}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedUser && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-80">
//             <h2 className="text-xl font-bold mb-4">User Details</h2>
//             <p><strong>Username:</strong> {selectedUser.username}</p>
//             <p><strong>Email:</strong> {selectedUser.email}</p>
//             <button
//               onClick={handleClosePopup}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersList;
