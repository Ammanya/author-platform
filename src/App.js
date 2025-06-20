import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import UserListPage from './pages/UserListPage';
import UserProfilePage from './pages/UserProfilePage';
import EditUserPage from './pages/EditUserPage';
import AddUserPage from './pages/AddUserPage';

import PostBookPage from './pages/PostBookPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
<Route path="/books/add" element={<PostBookPage />} />

      </Routes>
    </Router>
  );
}

export default App;
