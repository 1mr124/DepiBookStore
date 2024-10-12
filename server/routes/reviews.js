const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for checking token

// POST /api/reviews - Submit a review (Protected route)
router.post('/reviews', authenticateToken, async (req, res) => {
    console.log(req.body);
    
    const { bookId, rating, review, bookName } = req.body;
    
    // Ensure that the user is authenticated
    const userId = req.user.userId; // Access the userId here
    console.log(userId);
    
    // Check if the userId is defined
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Create a new review with the userId
        const newReview = new Review({ bookId, userId, rating, review, bookName });
        await newReview.save();
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Failed to submit review', error });
    }
});

// GET /api/reviews/user - Fetch user reviews (Protected route)
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from the token
        const reviews = await Review.find({ userId }); // Fetch reviews for the authenticated user
        console.log(reviews);
        
        res.json(reviews); // Return the reviews as JSON
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

module.exports = router;
