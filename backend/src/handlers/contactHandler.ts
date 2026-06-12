import { Request, Response } from 'express';
import { validateContactForm } from '../services/validationService';
import { sendContactEmail } from '../services/emailService';
import { successResponse, validationErrorResponse, internalErrorResponse } from '../utils/responses';
import { logger } from '../utils/logger';

export async function handleContactForm(req: Request, res: Response) {
  const validation = validateContactForm(req.body);

  if (!validation.success) {
    logger.warn({ error: validation.error }, 'Contact form validation failed');
    const response = validationErrorResponse(validation.error!);
    return res.status(400).json(response);
  }

  const emailSent = await sendContactEmail(validation.data!);

  if (!emailSent) {
    const response = internalErrorResponse('Failed to send email. Please try again later.');
    return res.status(500).json(response);
  }

  const response = successResponse('Contact form submitted successfully', {
    id: `contact_${Date.now()}`,
    timestamp: new Date().toISOString(),
    email: validation.data!.email,
  });

  res.status(200).json(response);
}
