const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  stock: Number,
  publishedYear: Number,
  publisher: String,
  rating: { type: Number, min: 1, max: 5 },
  coverImage: String,
  isbn: { type: String, unique: true, sparse: true } ,// Make ISBN unique
  addedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

bookSchema.index({ title: 1, author: 1 }, { unique: true }); // Make title and author unique together


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
