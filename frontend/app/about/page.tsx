import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { colors } from '@/styles/theme';
import { getPortfolioDataSync } from '@/lib/portfolio';

const portfolio = getPortfolioDataSync();

/**
 * About page with professional summary
 */
export default function AboutPage(): React.ReactElement {
  const { personal, about } = portfolio;

  return (
    <div style={{ backgroundColor: colors.primary.main, minHeight: '100vh' }}>
      <Container>
        <div className="py-20 space-y-12">
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: colors.accent.main }}
            >
              About Me
            </h1>
            <p
              className="text-xl"
              style={{ color: colors.neutral.white }}
            >
              {personal.title} from {personal.location}
            </p>
          </div>

          <Card variant="elevated" className="space-y-6">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: colors.accent.main }}
              >
                Professional Summary
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.neutral.lightGray }}
              >
                {about.summary}
              </p>
            </div>
          </Card>

          <Card className="space-y-6">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: colors.accent.main }}
              >
                My Journey
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.neutral.lightGray }}
              >
                {about.intro}
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colors.accent.main }}
              >
                What I Do
              </h3>
              <ul
                className="space-y-2 text-base"
                style={{ color: colors.neutral.lightGray }}
              >
                <li className="flex items-start">
                  <span
                    className="mr-3 font-bold"
                    style={{ color: colors.accent.main }}
                  >
                    •
                  </span>
                  Design and implement scalable microservices architectures
                </li>
                <li className="flex items-start">
                  <span
                    className="mr-3 font-bold"
                    style={{ color: colors.accent.main }}
                  >
                    •
                  </span>
                  Build robust REST and gRPC APIs with high performance requirements
                </li>
                <li className="flex items-start">
                  <span
                    className="mr-3 font-bold"
                    style={{ color: colors.accent.main }}
                  >
                    •
                  </span>
                  Implement secure authentication and authorization systems
                </li>
                <li className="flex items-start">
                  <span
                    className="mr-3 font-bold"
                    style={{ color: colors.accent.main }}
                  >
                    •
                  </span>
                  Apply clean architecture and SOLID principles
                </li>
                <li className="flex items-start">
                  <span
                    className="mr-3 font-bold"
                    style={{ color: colors.accent.main }}
                  >
                    •
                  </span>
                  Optimize system performance and observability
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
