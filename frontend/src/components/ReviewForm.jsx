import React, { useState } from 'react';
import API from '../api/axios';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user || !comment || !rating) {
      setError('All fields are required.');
      return;
    }

    try {
      await API.post('/reviews', {
        bookId,
        user,
        comment,
        rating: parseInt(rating),
      });
      setSuccess('Review submitted successfully!');
      setUser('');
      setComment('');
      setRating(1);
      onReviewAdded(); // Refresh the review list
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">📝 Leave a Review</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 && 's'}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
