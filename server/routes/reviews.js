const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for checking token

// POST /api/reviews - Submit a review (Protected route)
router.post('/reviews', authenticateToken, async (req, res) => {
    console.log(req.body);
    
    const { bookId, rating, review } = req.body;
    
    // Ensure that the user is authenticated
    const userId = req.user.userId; // Access the userId here
    console.log(userId);
    
    // Check if the userId is defined
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Create a new review with the userId
        const newReview = new Review({ bookId, userId, rating, review });
        await newReview.save();
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Failed to submit review', error });
    }
});

module.exports = router;
