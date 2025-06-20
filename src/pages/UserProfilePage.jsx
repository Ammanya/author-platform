import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';

const UserProfilePage = () => {
  const { id } = useParams(); // this is the ObjectId now
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookTitles, setBookTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAndReviews = async () => {
      try {
        // ✅ Fetch user details
        const userRes = await API.get(`/users/${id}`);
        setUser(userRes.data);

        // ✅ Fetch reviews by userId
        const reviewsRes = await API.get('/reviews', {
          params: { userId: id },
        });
        setReviews(reviewsRes.data);

        // ✅ Fetch book titles
        const bookIds = [...new Set(reviewsRes.data.map((r) => r.bookId))];
        const titles = {};
        for (const bookId of bookIds) {
          const bookRes = await API.get(`/books/${bookId}`);
          titles[bookId] = bookRes.data.title;
        }
        setBookTitles(titles);
      } catch (err) {
        console.error(err);
        setError('Failed to load user or reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndReviews();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        👤 Reviews by {user ? user.name : 'Loading...'}
      </h1>

      <Link
        to={`/users/${id}/edit`}
        className="text-blue-500 underline mb-4 inline-block"
      >
        ✏️ Edit Profile
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review._id} className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold text-lg text-blue-700">
                📖 {bookTitles[review.bookId] || 'Book title loading...'}
              </h3>
              <p className="text-gray-800">{review.comment}</p>
              <p className="text-yellow-600 text-sm">⭐ {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfilePage;
