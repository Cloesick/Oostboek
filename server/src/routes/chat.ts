import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

router.use(authenticate);

const messageSchema = z.object({
  content: z.string().min(1).max(2000),
});

// GET /api/chat/sessions - List user's chat sessions
router.get('/sessions', async (req, res, next) => {
  try {
    const sessions = await prisma.chatSession.findMany({
      where: { userId: req.auth!.userId },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    
    res.json({ success: true, data: sessions });
  } catch (error) {
    next(error);
  }
});

// POST /api/chat/sessions - Create new chat session
router.post('/sessions', async (req, res, next) => {
  try {
    const session = await prisma.chatSession.create({
      data: {
        userId: req.auth!.userId,
      },
      include: {
        messages: true,
      },
    });
    
    // Add welcome message
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'ASSISTANT',
        content: 'Welkom bij Oostboek! Hoe kan ik u vandaag helpen? Ik kan u informatie geven over onze diensten, BTW-administratie, fiscale vragen, of u helpen een afspraak te maken.',
        sources: '',
      },
    });
    
    const updatedSession = await prisma.chatSession.findUnique({
      where: { id: session.id },
      include: { messages: true },
    });
    
    res.status(201).json({ success: true, data: updatedSession });
  } catch (error) {
    next(error);
  }
});

// GET /api/chat/sessions/:id - Get session with messages
router.get('/sessions/:id', async (req, res, next) => {
  try {
    const session = await prisma.chatSession.findFirst({
      where: {
        id: req.params['id'],
        userId: req.auth!.userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    
    if (!session) {
      throw new AppError(404, 'Chat session not found');
    }
    
    res.json({ success: true, data: session });
  } catch (error) {
    next(error);
  }
});

// POST /api/chat/sessions/:id/messages - Send message
router.post('/sessions/:id/messages', async (req, res, next) => {
  try {
    const { content } = messageSchema.parse(req.body);
    const sessionId = req.params['id'];
    
    // Verify session belongs to user
    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: req.auth!.userId,
      },
    });
    
    if (!session) {
      throw new AppError(404, 'Chat session not found');
    }
    
    // Save user message
    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'USER',
        content,
        sources: '',
      },
    });
    
    // TODO: Integrate with Azure OpenAI for real responses
    // For now, return a placeholder response
    const aiResponse = generatePlaceholderResponse(content);
    
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'ASSISTANT',
        content: aiResponse.content,
        sources: aiResponse.sources,
      },
    });
    
    // Check if escalation is needed
    if (aiResponse.shouldEscalate) {
      await prisma.chatSession.update({
        where: { id: sessionId },
        data: {
          status: 'ESCALATED',
          escalatedAt: new Date(),
          escalationReason: aiResponse.escalationReason ?? null,
        },
      });
    }
    
    res.status(201).json({
      success: true,
      data: {
        userMessage,
        assistantMessage,
        escalated: aiResponse.shouldEscalate,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Placeholder response generator (replace with Azure OpenAI)
function generatePlaceholderResponse(userMessage: string): {
  content: string;
  sources: string;
  shouldEscalate: boolean;
  escalationReason?: string;
} {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for escalation triggers
  if (
    lowerMessage.includes('dringend') ||
    lowerMessage.includes('urgent') ||
    lowerMessage.includes('klacht') ||
    lowerMessage.includes('probleem met factuur')
  ) {
    return {
      content: 'Ik begrijp dat dit dringend is. Ik verbind u door met een medewerker die u persoonlijk kan helpen. U kunt ook direct een afspraak maken via de "Afspraak maken" knop.',
      sources: '',
      shouldEscalate: true,
      escalationReason: 'Urgent request detected',
    };
  }
  
  // FAQ responses
  if (lowerMessage.includes('btw') || lowerMessage.includes('vat')) {
    return {
      content: 'Voor BTW-administratie bieden wij volledige ondersteuning. De BTW-aangifte moet maandelijks of driemaandelijks worden ingediend, afhankelijk van uw omzet. Wilt u een afspraak maken om uw specifieke situatie te bespreken?',
      sources: 'FAQ: BTW-administratie',
      shouldEscalate: false,
    };
  }
  
  if (lowerMessage.includes('factuur') || lowerMessage.includes('invoice')) {
    return {
      content: 'Facturen moeten in België 10 jaar bewaard worden. U kunt uw facturen uploaden via de "Documenten" sectie in uw dashboard. Wij ondersteunen ook Peppol e-facturatie.',
      sources: 'FAQ: Factuurbeheer, Belgische wetgeving',
      shouldEscalate: false,
    };
  }
  
  if (lowerMessage.includes('afspraak') || lowerMessage.includes('appointment')) {
    return {
      content: 'U kunt eenvoudig een afspraak maken via de "Afspraak maken" knop in het menu. Kies het type dienst, selecteer een beschikbare medewerker en tijdslot, en vul het intakeformulier in.',
      sources: '',
      shouldEscalate: false,
    };
  }
  
  // Default response
  return {
    content: 'Bedankt voor uw vraag. Ik help u graag verder. Kunt u wat meer details geven over wat u precies wilt weten? Of wilt u direct een afspraak maken met een van onze specialisten?',
    sources: '',
    shouldEscalate: false,
  };
}

export { router as chatRouter };
