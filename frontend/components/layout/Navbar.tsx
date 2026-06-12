'use client';

import Link from 'next/link';
import { colors } from '@/styles/theme';
import { Button } from '@/components/common/Button';

/**
 * Navigation component with links to all pages + social links
 */
export function Navbar(): React.ReactElement {
  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: colors.primary.navy }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold" style={{ color: colors.accent.gold }}>
          Portfolio
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            className="transition-colors hover:text-gold"
            style={{ color: colors.neutral.white }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-gold"
            style={{ color: colors.neutral.white }}
          >
            About
          </Link>
          <Link
            href="/experience"
            className="transition-colors hover:text-gold"
            style={{ color: colors.neutral.white }}
          >
            Experience
          </Link>
          <Link
            href="/skills"
            className="transition-colors hover:text-gold"
            style={{ color: colors.neutral.white }}
          >
            Skills
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-gold"
            style={{ color: colors.neutral.white }}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="transition-colors hover:text-gold"
            style={{ color: colors.neutral.white }}
          >
            Blog
          </Link>
          <Button size="sm">
            <Link href="/contact" style={{ color: colors.primary.navy }}>
              Contact
            </Link>
          </Button>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden flex gap-4">
          <Button size="sm">
            <Link href="/contact" style={{ color: colors.primary.navy }}>
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
