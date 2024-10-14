const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const authenticateToken = require("../middleware/authenticateToken"); // Middleware for checking token
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // وجهة حفظ الملفات
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // إضافة timestamp لتجنب التكرار
  }
});

const upload = multer({ storage: storage });


// POST: /books/post - Submit a new Book (Protected route)
router.post("/post", authenticateToken, async (req, res) => {
  console.log(req.body);

  const {
    title,
    author,
    description,
    category,
    price,
    stock,
    publishedYear,
    publisher,
    rating,
    isbn,
  } = req.body;
  
  const coverImage = req.file ? req.file.path : null;
  // Ensure that the user is authenticated
  const userId = req.user.userId; // Access the userId here
  console.log(userId);

  console.log("Posting...");

  // Check if the userId is defined
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
}

  // Check that their is inputs
  if (
    !title &&
    !author &&
    !price &&
    !description &&
    !category &&
    !stock &&
    !publishedYear &&
    !publisher &&
    !rating &&
    !coverImage &&
    !isbn
  ) {
    return res
      .status(400)
      .json({ message: "No data entered. Please provide at least one field." });
  }
  // Check the mandatory inputs
  if (!title || !author || !price) {
    return res
      .status(400)
      .json({ message: "Title, author, and price are required fields." });
  }
  // Check the types of Inputs
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof price !== "number"
  ) {
    return res
      .status(400)
      .json({
        message:
          "Invalid input types. Title and author should be strings, and price should be a number.",
      });
  }

  try {
    const newBook = new Book({
      title,
      author,
      description,
      category,
      price,
      stock,
      publishedYear,
      publisher,
      rating,
      coverImage,
      isbn,
      addedBy: userId
    });

    // save on DB
    await newBook.save();
    console.log("Saved");
    res
      .status(201)
      .json({ message: "Book added successfully!", book: newBook });
    console.log("Book Added");
  } catch (error) {
    // Check the duplication
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message:
            "A book with the same ISBN or title and author already exists.",
        });
    }
    console.error(error);
    res.status(500).json({ message: "Server error. Could not add book." });
  }
});

// GET : books/              //Retrieve all posted books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate('addedBy', 'username email'); // Show User Added th post with books added
    /* const books = await Book.find(); Show Books only */
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve books." });
  }
});

// GET Book By Id :
router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params; // Get the book ID from the URL parameters

  try {
    const book = await Book.findById(id).populate('addedBy', 'username email'); // Fetch book details from the database

    if (!book) {
      return res.status(404).json({ message: "Book not found." }); // Handle case where book is not found
    }

    res.status(200).json(book); // Return the book details
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).json({ message: "Server error. Could not retrieve book." });
  }
});

module.exports = router;
