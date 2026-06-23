import type { PortfolioDataLocal } from './types';

let portfolioData: PortfolioDataLocal | null = null;

/**
 * Load portfolio data from the public folder
 */
export async function getPortfolioData(): Promise<PortfolioDataLocal> {
  if (portfolioData) {
    return portfolioData;
  }

  try {
    const response = await fetch('/portfolio.json');
    if (!response.ok) {
      throw new Error('Failed to load portfolio.json');
    }
    portfolioData = await response.json();
    return portfolioData!;
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Return empty portfolio data as fallback
    return {
      personal: {
        name: 'Restow Frandha',
        title: 'Software Engineer',
        email: 'restow.frandha@gmail.com',
        location: 'Jakarta, Indonesia',
        social: {
          linkedin: 'https://linkedin.com/in/restow-frandha',
          github: 'https://github.com/RFrandha',
        },
      },
      about: {
        summary: '',
        intro: '',
      },
      experience: [],
      skills: {
        languages: [],
        frameworks: [],
        tools: [],
        specialties: [],
      },
      projects: [],
      blog: [],
    };
  }
}

/**
 * Get portfolio data synchronously (for server-side code at build time)
 */
export function getPortfolioDataSync(): PortfolioDataLocal {
  if (typeof window === 'undefined') {
    // Server-side: try to load from file system
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'public', 'portfolio.json');
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }
  
  // Fallback
  return {
    personal: {
      name: 'Restow Frandha',
      title: 'Software Engineer',
      email: 'restow.frandha@gmail.com',
      location: 'Jakarta, Indonesia',
      social: {
        linkedin: 'https://linkedin.com/in/restow-frandha',
        github: 'https://github.com/RFrandha',
      },
    },
    about: {
      summary: '',
      intro: '',
    },
    experience: [],
    skills: {
      languages: [],
      frameworks: [],
      tools: [],
      specialties: [],
    },
    projects: [],
    blog: [],
  };
}
