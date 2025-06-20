import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/users');
        const user = res.data.find(u => u._id === id);

        if (user) {
          setFormData({ name: user.name || '', email: user.email || '' });
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to load user');
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await API.put(`/users/${id}`, formData);
      setLoading(false);
      alert('✅ Profile updated successfully!');
      navigate(`/users/${id}`); // Go back to profile page
    } catch (err) {
      setLoading(false);
      setError('❌ Failed to update user');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Profile</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 w-full mb-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
};

export default UserEditPage;
