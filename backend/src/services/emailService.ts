import nodemailer from 'nodemailer';
import { ContactFormData } from '../types';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 10px; background: #f5f5f5; border-radius: 4px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p>Reply to: <a href="mailto:${data.email}">${data.email}</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info({ email: data.email, name: data.name }, 'Contact email sent');
    return true;
  } catch (error) {
    logger.error({ error, email: data.email }, 'Failed to send contact email');
    return false;
  }
}
