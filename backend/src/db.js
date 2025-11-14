// In-memory data (for dev; use SQLite in production)
export const users = []; // Populated by auth routes

export const services = [
  {
    _id: '1',
    title: 'Plumbing',
    description: 'Fix leaks and pipes',
    price: 100,
  },
  {
    _id: '2',
    title: 'Cleaning',
    description: 'Deep home cleaning',
    price: 80,
  },
  {
    _id: '3',
    title: 'Electrical',
    description: 'Wiring and repairs',
    price: 120,
  },
];

export const bookings = [];