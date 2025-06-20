// controllers/bookController.js
import Book from '../models/Book.js';

// ✅ GET /books?page=1&limit=10&search=xyz&genre=Fiction
export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', genre = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (genre) query.genre = genre;

    const total = await Book.countDocuments(query);
    const books = await Book.find(query).skip(skip).limit(Number(limit));

    res.status(200).json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      books
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books', error: err.message });
  }
};

// ✅ GET /books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get book', error: err.message });
  }
};

// ✅ POST /books
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create book', error: err.message });
  }
};
