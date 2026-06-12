export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = any> {
  code: 'SUCCESS' | 'VALIDATION_ERROR' | 'INTERNAL_ERROR' | 'NOT_FOUND';
  message: string;
  data: T | null;
}

export interface EnvironmentConfig {
  PORT: number;
  NODE_ENV: string;
  CORS_ORIGIN: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  CONTACT_EMAIL: string;
}
