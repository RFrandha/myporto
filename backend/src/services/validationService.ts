import { z } from 'zod';
import { ContactFormData } from '../types';
import { validationErrorResponse } from '../utils/responses';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  error?: string;
} {
  try {
    const validated = contactSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((e: { message: string }) => e.message).join(', ');
      return { success: false, error: messages };
    }
    return { success: false, error: 'Validation failed' };
  }
}
