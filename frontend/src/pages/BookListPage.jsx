import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = async (pageNumber = 1, searchTerm = '', selectedGenre = '') => {
    setLoading(true);
    try {
      const res = await API.get(`/books`, {
        params: { page: pageNumber, limit: 6, search: searchTerm, genre: selectedGenre },
      });
      setBooks(res.data.books);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to fetch books');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks(page, search, genre);
  }, [page, search, genre]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">📚 Book List</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title or author"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full md:w-1/2 shadow-sm"
        />
        <select
          value={genre}
          onChange={handleGenreChange}
          className="p-2 border rounded w-full md:w-1/4 shadow-sm"
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Biography">Biography</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science">Science</option>
          <option value="Mystery">Mystery</option>
        </select>
      </div>

      {/* ➕ Post Button */}
      <Link
        to="/books/add"
        className="inline-block mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Post New Book
      </Link>

      {/* 📖 Book Grid */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && books.length === 0 && <p className="text-gray-500">No books found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="border rounded p-4 shadow bg-white hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
            <p className="text-gray-700 text-sm">Author: {book.author}</p>
            <p className="text-gray-500 text-sm">Genre: {book.genre}</p>
            <p className="text-yellow-600 text-sm mb-2">⭐ {book.rating}</p>
            <Link to={`/books/${book._id}`} className="text-blue-600 hover:underline">
              View Details →
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4 items-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="text-gray-700">
          Page <strong>{page}</strong> of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default BookListPage;
