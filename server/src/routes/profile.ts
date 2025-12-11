import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Validation schema for profile update
const updateProfileSchema = z.object({
  companyName: z.string().optional(),
  phone: z.string().optional(),
  legalForm: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  howDidYouHear: z.string().optional(),
});

// PUT /api/profile - Update user profile (authenticated)
router.put('/', authenticate, async (req, res, next) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    
    const user = await prisma.user.update({
      where: { id: req.auth!.userId },
      data: {
        companyName: data.companyName ?? null,
        phone: data.phone ?? null,
        legalForm: data.legalForm ?? null,
        street: data.street ?? null,
        city: data.city ?? null,
        postalCode: data.postalCode ?? null,
        howDidYouHear: data.howDidYouHear ?? null,
        profileCompleted: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        companyName: true,
        phone: true,
        legalForm: true,
        profileCompleted: true,
      },
    });
    
    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: req.auth!.userId,
        action: 'UPDATE',
        resource: 'user',
        resourceId: req.auth!.userId,
        ipAddress: req.ip ?? null,
        userAgent: req.headers['user-agent'] ?? null,
        metadata: JSON.stringify({ fields: Object.keys(data) }),
      },
    });
    
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/profile - Get current user profile (authenticated)
router.get('/', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.auth!.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        companyName: true,
        phone: true,
        vatNumber: true,
        legalForm: true,
        street: true,
        city: true,
        postalCode: true,
        howDidYouHear: true,
        profileCompleted: true,
      },
    });
    
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export { router as profileRouter };
