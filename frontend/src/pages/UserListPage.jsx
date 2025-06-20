import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">👥 All Users</h1>

      {/* ➕ Add New User button */}
      <Link
        to="/users/add"
        className="inline-block mb-4 text-green-600 hover:underline"
      >
        ➕ Add New User
      </Link>

      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id}>
            <Link
              to={`/users/${user._id}`}
              className="text-blue-600 hover:underline"
            >
              {user.name || user.email || 'Unnamed User'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
