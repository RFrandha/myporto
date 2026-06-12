import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { colors } from '@/styles/theme';
import Link from 'next/link';

/**
 * Home page with Hero, intro, CTA buttons
 */
export default function Home(): React.ReactElement {
  return (
    <div style={{ backgroundColor: colors.primary.navy }}>
      <Hero />

      <section className="py-16 px-4" style={{ backgroundColor: colors.primary.navy }}>
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.accent.gold }}
              >
                Backend Engineer
              </h3>
              <p style={{ color: colors.neutral.lightGray }}>
                6+ years building scalable microservices and APIs in Go and Java
              </p>
            </Card>

            <Card variant="elevated">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.accent.gold }}
              >
                Clean Architecture
              </h3>
              <p style={{ color: colors.neutral.lightGray }}>
                Designing reliable, maintainable systems using proven patterns and principles
              </p>
            </Card>

            <Card variant="elevated">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.accent.gold }}
              >
                DevOps & Observability
              </h3>
              <p style={{ color: colors.neutral.lightGray }}>
                Docker, GCP, and comprehensive monitoring for production systems
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: colors.primary.darkNavy }}>
        <Container>
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: colors.accent.gold }}
          >
            Featured Highlights
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colors.accent.gold }}
              >
                Experience
              </h3>
              <p style={{ color: colors.neutral.lightGray }} className="mb-4">
                Worked at leading fintech and enterprise software companies
              </p>
              <Link
                href="/experience"
                style={{ color: colors.accent.gold }}
                className="font-semibold hover:underline"
              >
                View Timeline →
              </Link>
            </Card>

            <Card>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colors.accent.gold }}
              >
                Projects
              </h3>
              <p style={{ color: colors.neutral.lightGray }} className="mb-4">
                Payment systems, identity management, and scalable APIs
              </p>
              <Link
                href="/projects"
                style={{ color: colors.accent.gold }}
                className="font-semibold hover:underline"
              >
                View Projects →
              </Link>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colors.accent.gold }}
              >
                Skills
              </h3>
              <p style={{ color: colors.neutral.lightGray }} className="mb-4">
                Go, Java, TypeScript, gRPC, microservices, and more
              </p>
              <Link
                href="/skills"
                style={{ color: colors.accent.gold }}
                className="font-semibold hover:underline"
              >
                View Skills →
              </Link>
            </Card>

            <Card>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colors.accent.gold }}
              >
                Blog
              </h3>
              <p style={{ color: colors.neutral.lightGray }} className="mb-4">
                Articles on backend architecture, APIs, and system design
              </p>
              <Link
                href="/blog"
                style={{ color: colors.accent.gold }}
                className="font-semibold hover:underline"
              >
                Read Articles →
              </Link>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
