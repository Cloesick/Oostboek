import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { authRouter } from './routes/auth.js';
import { appointmentRouter } from './routes/appointments.js';
import { chatRouter } from './routes/chat.js';
import { leadsRouter } from './routes/leads.js';
import { profileRouter } from './routes/profile.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

const app = express();
const PORT = process.env['PORT'] ?? 3001;
const isDev = process.env['NODE_ENV'] !== 'production';

// Trust proxy for App Runner (required for rate limiting behind load balancer)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: isDev ? false : true,
}));
// CORS - allow multiple origins for Vercel preview deployments
const allowedOrigins = [
  process.env['CLIENT_URL'] ?? 'http://localhost:5173',
  'https://oostboek.vercel.app',
  'https://oostboek.be',
  'https://www.oostboek.be',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow Vercel preview deployments
    if (origin.includes('vercel.app') || origin.includes('oostboek')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Rate limiting (GDPR: protect against brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Request logging (for audit trail)
app.use(requestLogger);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/chat', chatRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/profile', profileRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Oostboek API running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
});

export default app;
