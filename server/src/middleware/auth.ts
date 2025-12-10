import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

export interface AuthPayload {
  userId: string;
  email: string;
  type: 'user' | 'staff';
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

const JWT_SECRET = process.env['JWT_SECRET'] ?? 'dev-secret-change-in-production';

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(401, 'Authentication required');
    }
    
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    
    req.auth = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'Invalid token'));
      return;
    }
    next(error);
  }
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '7d',
  });
}
