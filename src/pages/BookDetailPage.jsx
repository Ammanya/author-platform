import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch book details');
      }
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="p-4">Loading book details...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!book) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-lg text-gray-700 mb-1">Author: {book.author}</p>
      <p className="text-sm text-gray-500 mb-3">Genre: {book.genre}</p>
      <p className="text-yellow-600 font-medium mb-3">⭐ {book.rating}</p>
      <p className="text-md text-gray-800 mb-6">{book.description}</p>

      <ReviewList bookId={id} />
      <ReviewForm bookId={id} onReviewAdded={() => window.location.reload()} />
    </div>
  );
};

export default BookDetailPage;
