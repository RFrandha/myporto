// Shared types between frontend and backend

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

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string;
  readingTime?: string;
  author?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    social: {
      linkedin: string;
      github: string;
    };
  };
  about: {
    summary: string;
    intro: string;
  };
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    tech: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    link: string;
  }>;
  blog: Array<{
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    file: string;
  }>;
}
