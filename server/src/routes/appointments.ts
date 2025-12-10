import { Router } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const SERVICE_TYPES = [
  'VAT_ADMINISTRATION',
  'TAX_CONSULTATION',
  'BOOKKEEPING',
  'STARTER_ADVICE',
  'SUCCESSION_PLANNING',
  'ACQUISITION_GUIDANCE',
  'LEGAL_ADVICE',
  'SOCIAL_ADVICE',
  'QUICK_QUESTION',
] as const;
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();
const prisma = new PrismaClient();

// All appointment routes require authentication
router.use(authenticate);

// Validation schemas
const createAppointmentSchema = z.object({
  staffId: z.string(),
  serviceType: z.enum(SERVICE_TYPES),
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().min(15).max(120).default(30),
  topic: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  documentsNeeded: z.array(z.string()).default([]),
});

// GET /api/appointments - List user's appointments
router.get('/', async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.auth!.userId },
      include: {
        staff: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
            specializations: true,
          },
        },
      },
      orderBy: { scheduledAt: 'asc' },
    });
    
    res.json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
});

// GET /api/appointments/available-slots
router.get('/available-slots', async (req, res, next) => {
  try {
    const { staffId, date, serviceType } = req.query;
    
    if (!date || typeof date !== 'string') {
      throw new AppError(400, 'Date is required');
    }
    
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    
    // Get existing appointments for the day
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        staffId: staffId as string | undefined,
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      select: {
        scheduledAt: true,
        durationMinutes: true,
      },
    });
    
    // Generate available slots (9:00 - 17:00, 30-min intervals)
    const slots: string[] = [];
    const bookedTimes = new Set(
      existingAppointments.map((a: { scheduledAt: Date }) => a.scheduledAt.toISOString())
    );
    
    for (let hour = 9; hour < 17; hour++) {
      for (const minute of [0, 30]) {
        const slotTime = new Date(startOfDay);
        slotTime.setHours(hour, minute, 0, 0);
        
        if (!bookedTimes.has(slotTime.toISOString())) {
          slots.push(slotTime.toISOString());
        }
      }
    }
    
    res.json({ success: true, data: slots });
  } catch (error) {
    next(error);
  }
});

// GET /api/appointments/staff - List available staff
router.get('/staff', async (_req, res, next) => {
  try {
    const staff = await prisma.staff.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        specializations: true,
      },
    });
    
    res.json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
});

// POST /api/appointments - Create new appointment
router.post('/', async (req, res, next) => {
  try {
    const data = createAppointmentSchema.parse(req.body);
    
    // Verify staff exists
    const staff = await prisma.staff.findUnique({
      where: { id: data.staffId },
    });
    
    if (!staff) {
      throw new AppError(404, 'Staff member not found');
    }
    
    // Check for conflicts
    const scheduledAt = new Date(data.scheduledAt);
    const endTime = new Date(scheduledAt.getTime() + data.durationMinutes * 60000);
    
    const conflict = await prisma.appointment.findFirst({
      where: {
        staffId: data.staffId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        scheduledAt: {
          gte: scheduledAt,
          lt: endTime,
        },
      },
    });
    
    if (conflict) {
      throw new AppError(409, 'Time slot is no longer available');
    }
    
    const appointment = await prisma.appointment.create({
      data: {
        userId: req.auth!.userId,
        staffId: data.staffId,
        serviceType: data.serviceType,
        scheduledAt,
        durationMinutes: data.durationMinutes,
        topic: data.topic,
        description: data.description,
        documentsNeeded: data.documentsNeeded.join(','),
      },
      include: {
        staff: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    
    // TODO: Send confirmation email/SMS
    
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/appointments/:id/cancel
router.patch('/:id/cancel', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const appointment = await prisma.appointment.findFirst({
      where: { id, userId: req.auth!.userId },
    });
    
    if (!appointment) {
      throw new AppError(404, 'Appointment not found');
    }
    
    if (appointment.status === 'CANCELLED') {
      throw new AppError(400, 'Appointment already cancelled');
    }
    
    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancelReason: reason,
      },
    });
    
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

export { router as appointmentRouter };
