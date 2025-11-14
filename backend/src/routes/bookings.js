import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js'; // Named import
import { bookings, services } from '../db.js';

const router = express.Router();

// Create booking (protected)
router.post('/', authenticateToken, (req, res) => {
  const { serviceId, date } = req.body;
  const userId = req.user.id; // From token

  const newBooking = {
    _id: Date.now().toString(),
    userId,
    serviceId,
    date,
    status: 'Pending',
  };

  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking created', booking: newBooking });
});

// Get user bookings (protected)
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userBookings = bookings
    .filter((b) => b.userId === userId)
    .map((b) => ({
      ...b,
      service: services.find((s) => s._id === b.serviceId), // Attach service details
    }));

  res.json(userBookings);
});

export default router;