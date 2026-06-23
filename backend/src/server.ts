import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { contactRoutes } from './routes/contact';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', contactRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug: test SMTP
import nodemailer from 'nodemailer';
app.get('/debug/smtp-test', async (req, res) => {
  const result: Record<string, unknown> = { env: { SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT, SMTP_USER: process.env.SMTP_USER, SMTP_PASS_SET: !!process.env.SMTP_PASSWORD, CONTACT_EMAIL: process.env.CONTACT_EMAIL } };
  try {
    const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: parseInt(process.env.SMTP_PORT || '587'), secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
    await t.verify();
    result.verify = 'OK';
    const info = await t.sendMail({ from: process.env.SMTP_USER, to: process.env.CONTACT_EMAIL, subject: 'Vercel Test', text: 'Test from Vercel' });
    result.send = `Sent: ${info.messageId}`;
  } catch (e: unknown) {
    result.error = e instanceof Error ? { message: e.message, code: (e as any).code, stack: e.stack } : String(e);
  }
  res.json(result);
});

// Error handler
app.use(errorHandler);

// Vercel serverless exports the app, doesn't call listen
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`CORS origin: ${CORS_ORIGIN}`);
  });
}

export default app;
