import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import collegeRoutes from './routes/college.routes.js';
import authRoutes from './routes/auth.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API v1 Routes
app.use('/api/v1/colleges', collegeRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/recommendations', recommendationRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`WebFoxx Colleges Backend running on port ${PORT}`);
});
