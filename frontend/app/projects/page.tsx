import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { colors } from '@/styles/theme';
import { getPortfolioDataSync } from '@/lib/portfolio';
import Link from 'next/link';

const portfolio = getPortfolioDataSync();

/**
 * Projects grid showing all projects from portfolio.json
 */
export default function ProjectsPage(): React.ReactElement {
  const { projects } = portfolio;

  return (
    <div style={{ backgroundColor: colors.primary.main, minHeight: '100vh' }}>
      <Container>
        <div className="py-20 space-y-12">
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: colors.accent.main }}
            >
              Projects
            </h1>
            <p
              className="text-xl"
              style={{ color: colors.neutral.lightGray }}
            >
              Selection of projects I've built and contributed to
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project: any, idx: number) => (
              <Card key={idx} variant="elevated" className="space-y-4">
                <div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: colors.accent.main }}
                  >
                    {project.title}
                  </h3>
                  {project.company && (
                    <p
                      className="text-sm font-medium"
                      style={{ color: colors.neutral.lightGray }}
                    >
                      {project.company}
                    </p>
                  )}
                </div>

                <p
                  className="text-base"
                  style={{ color: colors.neutral.lightGray }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: colors.primary.light }}>
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: colors.primary.light,
                        color: colors.accent.main,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && project.link !== '#' && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold hover:underline"
                    style={{ color: colors.accent.main }}
                  >
                    Learn More →
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
