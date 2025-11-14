// src/seed.js
const db = require('./db');
const bcrypt = require('bcrypt');

function run() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password_hash TEXT,
      role TEXT DEFAULT 'user',
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Services
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      category TEXT,
      description TEXT,
      duration_minutes INTEGER,
      price REAL,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Bookings
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      service_id INTEGER,
      scheduled_at DATETIME,
      duration_minutes INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(service_id) REFERENCES services(id)
    );
  `);

  // Create sample admin + user
  const adminEmail = 'admin@taskninja.local';
  const userEmail = 'user@taskninja.local';

  const insertUser = db.prepare('INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
  const saltRounds = 10;

  const adminPassword = 'Admin123!'; // change later
  const userPassword = 'User123!';

  const adminHash = bcrypt.hashSync(adminPassword, saltRounds);
  const userHash = bcrypt.hashSync(userPassword, saltRounds);

  insertUser.run('Admin', adminEmail, adminHash, 'admin');
  insertUser.run('Demo User', userEmail, userHash, 'user');

  // Sample services
  const insertService = db.prepare('INSERT OR IGNORE INTO services (id, title, category, description, duration_minutes, price) VALUES (?, ?, ?, ?, ?, ?)');
  insertService.run(1, 'Home Cleaning', 'Home', '1-hour cleaning service', 60, 250);
  insertService.run(2, 'AC Repair', 'Appliances', 'AC installation and repair', 120, 1200);

  console.log('DB initialized and seeded.');
}

run();
