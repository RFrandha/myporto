import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { colors } from '@/styles/theme';
import { getPortfolioDataSync } from '@/lib/portfolio';

const portfolio = getPortfolioDataSync();

/**
 * Experience timeline with all 5 roles from portfolio.json
 */
export default function ExperiencePage(): React.ReactElement {
  const { experience } = portfolio;

  return (
    <div style={{ backgroundColor: colors.primary.main, minHeight: '100vh' }}>
      <Container>
        <div className="py-20 space-y-12">
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: colors.accent.main }}
            >
              Experience
            </h1>
            <p
              className="text-xl"
              style={{ color: colors.neutral.lightGray }}
            >
              6+ years of professional software engineering
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((job: any, idx: number) => (
              <Card key={idx} className="border-l-4" style={{ borderLeftColor: colors.accent.main }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: colors.accent.main }}
                    >
                      {job.position}
                    </h3>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: colors.neutral.white }}
                    >
                      {job.companyLong}
                    </p>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.neutral.lightGray }}
                  >
                    {job.period}
                  </p>
                </div>

                <p
                  className="mb-4"
                  style={{ color: colors.neutral.lightGray }}
                >
                  {job.description}
                </p>

                <div className="mb-4">
                  <p
                    className="text-sm font-semibold mb-2"
                    style={{ color: colors.accent.main }}
                  >
                    Key Achievements:
                  </p>
                  <ul
                    className="space-y-1 text-sm"
                    style={{ color: colors.neutral.lightGray }}
                  >
                    {job.achievements.map((achievement: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span
                          className="mr-2 font-bold"
                          style={{ color: colors.accent.main }}
                        >
                          •
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech: string) => (
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
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
