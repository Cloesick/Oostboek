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

// Security middleware
app.use(helmet({
  contentSecurityPolicy: isDev ? false : undefined, // Disable CSP in dev to avoid Chrome DevTools noise
}));
app.use(cors({
  origin: process.env['CLIENT_URL'] ?? 'http://localhost:5173',
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
