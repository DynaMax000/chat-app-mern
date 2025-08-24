import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// middlewares
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} (CORS: ${FRONTEND_URL})`);
  connectDB();
});