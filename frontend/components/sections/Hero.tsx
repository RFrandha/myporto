import { colors } from '@/styles/theme';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

/**
 * Hero section on home page
 */
export function Hero(): React.ReactElement {
  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: colors.primary.darkNavy }}
    >
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          style={{ color: colors.accent.gold }}
        >
          Restow Frandha
        </h1>

        <p
          className="text-xl md:text-2xl font-semibold"
          style={{ color: colors.neutral.white }}
        >
          Software Engineer | Backend & Microservices Specialist
        </p>

        <p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: colors.neutral.lightGray }}
        >
          Building scalable, robust systems with 6+ years of experience in Go, Java, and modern distributed systems. Passionate about microservices, clean architecture, and reliable APIs.
        </p>

        <div className="flex gap-4 justify-center flex-wrap pt-4">
          <Button>
            <Link href="/projects" style={{ color: colors.primary.navy }}>
              View My Work
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/contact">
              Get In Touch
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
