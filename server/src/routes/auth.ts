import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { generateToken, authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  vatNumber: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'GDPR consent is required',
  }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existing) {
      throw new AppError(409, 'Email already registered');
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);
    
    // Create user with GDPR consent
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone ?? null,
        vatNumber: data.vatNumber ?? null,
        gdprConsentAt: new Date(),
        gdprConsentVersion: '1.0',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      type: 'user',
    });
    
    // Log audit event
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CONSENT_GIVEN',
        resource: 'user',
        resourceId: user.id,
        ipAddress: req.ip ?? null,
        userAgent: req.headers['user-agent'] ?? null,
        metadata: JSON.stringify({ consentVersion: '1.0' }),
      },
    });
    
    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email: data.email, deletedAt: null },
    });
    
    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }
    
    const validPassword = await bcrypt.compare(data.password, user.passwordHash);
    
    if (!validPassword) {
      throw new AppError(401, 'Invalid credentials');
    }
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    
    const token = generateToken({
      userId: user.id,
      email: user.email,
      type: 'user',
    });
    
    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        resource: 'user',
        resourceId: user.id,
        ipAddress: req.ip ?? null,
        userAgent: req.headers['user-agent'] ?? null,
      },
    });
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.auth!.userId, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        vatNumber: true,
        mfaEnabled: true,
        gdprConsentAt: true,
      },
    });
    
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res, next) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: req.auth!.userId,
        action: 'LOGOUT',
        resource: 'user',
        resourceId: req.auth!.userId,
        ipAddress: req.ip ?? null,
        userAgent: req.headers['user-agent'] ?? null,
      },
    });
    
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    next(error);
  }
});

export { router as authRouter };
