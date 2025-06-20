import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/reviews?bookId=${bookId}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">📣 Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review._id} className="p-3 bg-gray-100 rounded">
              <p className="font-medium">{review.user || 'Anonymous'}:</p>
              <p>{review.comment}</p>
              <p className="text-sm text-yellow-600">⭐ {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
