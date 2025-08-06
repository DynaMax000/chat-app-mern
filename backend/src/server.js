import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { connectDB } from './lib/db.js'; 

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// middlewares
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});