// Re-export shared types from the shared types file
export type {
  ContactFormData,
  ApiResponse,
  BlogPost,
  PortfolioData,
} from '../../shared/types';

// Local interface for portfolio data from JSON
export interface PortfolioDataLocal {
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
    companyLong: string;
    position: string;
    period: string;
    location: string;
    description: string;
    summary: string;
    tech: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    specialties: string[];
  };
  projects: Array<{
    title: string;
    company?: string;
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
