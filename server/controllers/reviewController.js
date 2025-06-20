import Review from '../models/Review.js';

// ✅ GET /reviews?bookId=xyz — Get all reviews for a specific book
export const getReviews = async (req, res) => {
  const { bookId, userId, user } = req.query;

  try {
    const filter = {};
    if (bookId) filter.bookId = bookId;
    if (userId) filter.userId = userId;  // optional if you add userId later
    if (user) filter.user = user;        // filter by username string

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews', error: err.message });
  }
};

// POST /reviews
export const createReview = async (req, res) => {
  const { bookId, user, comment, rating } = req.body;

  if (!bookId || !user || !comment || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = new Review({ bookId, user, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create review', error: err.message });
  }
};
