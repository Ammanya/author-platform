import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-blue-700">📚 Welcome to BookNest</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
        Discover, post, and review your favorite books with ease. Join the reader's hub!
      </p>

      <div className="flex gap-6">
        <Link
          to="/books"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
        >
          📖 Browse Books
        </Link>
        <Link
          to="/users"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
        >
          👥 View Users
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
