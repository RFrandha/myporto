import Link from 'next/link';
import { colors } from '@/styles/theme';

const SOCIAL_LINKS = {
  github: 'https://github.com/RFrandha',
  linkedin: 'https://linkedin.com/in/rfrandha',
};

/**
 * Footer with social links and copyright
 */
export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto py-8"
      style={{
        backgroundColor: colors.primary.darkNavy,
        borderColor: colors.accent.gold,
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div style={{ color: colors.neutral.white }}>
            <p className="font-semibold mb-2">Restow Frandha</p>
            <p style={{ color: colors.neutral.lightGray }}>
              Software Engineer | Backend & Microservices
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
              style={{ color: colors.accent.gold }}
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
              style={{ color: colors.accent.gold }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:restow.frandha@gmail.com"
              className="transition-colors hover:text-gold"
              style={{ color: colors.accent.gold }}
            >
              Email
            </a>
          </div>
        </div>

        <div
          className="border-t mt-6 pt-6 text-center text-sm"
          style={{ borderColor: colors.primary.lightNavy }}
        >
          <p style={{ color: colors.neutral.lightGray }}>
            © {currentYear} Restow Frandha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
