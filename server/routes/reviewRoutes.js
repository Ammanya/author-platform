import express from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getReviews);        // GET /reviews?bookId=123
router.post('/', createReview);     // POST /reviews

export default router;
