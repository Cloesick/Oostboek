import { Router } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Validation schema
const createLeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1),
  source: z.string().optional().default('website'),
});

// POST /api/leads - Create a new lead (public endpoint)
router.post('/', async (req, res, next) => {
  try {
    const data = createLeadSchema.parse(req.body);
    
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        source: data.source,
      },
    });
    
    // Log for audit
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        resource: 'lead',
        resourceId: lead.id,
        ipAddress: req.ip ?? null,
        userAgent: req.headers['user-agent'] ?? null,
        metadata: JSON.stringify({ email: data.email }),
      },
    });
    
    res.status(201).json({
      success: true,
      message: 'Bedankt! We nemen zo snel mogelijk contact met u op.',
    });
  } catch (error) {
    next(error);
  }
});

export { router as leadsRouter };
