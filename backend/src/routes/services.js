import express from 'express';
import { services } from '../db.js';

const router = express.Router();

// Get all services
router.get('/', (req, res) => {
  res.json(services);
});

// Get service by ID
router.get('/:id', (req, res) => {
  const service = services.find((s) => s._id === req.params.id);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
});

export default router;