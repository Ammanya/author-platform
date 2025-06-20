import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: String, required: true },       // ✅ rename to 'user'
  comment: { type: String, required: true },    // ✅ rename to 'comment'
  rating: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
