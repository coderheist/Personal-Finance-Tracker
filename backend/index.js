// backend/index.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('💰 Personal Finance Tracker API is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
