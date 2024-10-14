const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // نموذج الكتاب
const authenticateToken = require("../middleware/authenticateToken"); // Middleware for checking token

// GET /    To get all Authenricated User Posts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id });
    console.log(books);
    if (!books) {
      return res.status(404).json({ msg: 'No books found for this user.' });
    }
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Book by Id 
router.delete('/:id', authenticateToken, async (req, res) => {
    const bookId = req.params.id;
    if (!bookId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid Book ID format" });
      }
  try {
    const book = await Book.findById(bookId);
    console.log("Printing req.params.id");
    console.log(req.params.id)

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
      await book.deleteOne({ _id: bookId });
      res.status(200).json({ message: "Book deleted successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 3. تعديل بيانات الكتاب بناءً على معرف الكتاب
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, author, description, category, price, stock, publishedYear, publisher, rating, coverImage, isbn } = req.body;

  // بناء الجسم المحدث
  const updatedBook = {};
  if (title) updatedBook.title = title;
  if (author) updatedBook.author = author;
  if (description) updatedBook.description = description;
  if (category) updatedBook.category = category;
  if (price) updatedBook.price = price;
  if (stock) updatedBook.stock = stock;
  if (publishedYear) updatedBook.publishedYear = publishedYear;
  if (publisher) updatedBook.publisher = publisher;
  if (rating) updatedBook.rating = rating;
  if (coverImage) updatedBook.coverImage = coverImage;
  if (isbn) updatedBook.isbn = isbn;

  try {
    let book = await Book.findById(req.params.id);

    // تأكد أن الكتاب موجود ويخص المستخدم الحالي
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // تحديث الكتاب
    book = await Book.findByIdAndUpdate(req.params.id, { $set: updatedBook }, { new: true });

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
