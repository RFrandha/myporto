import { Router } from 'express';
import { handleContactForm } from '../handlers/contactHandler';

const router = Router();

router.post('/contact', handleContactForm);

export { router as contactRoutes };
