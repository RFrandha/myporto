import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { colors } from '@/styles/theme';
import { getPortfolioDataSync } from '@/lib/portfolio';

const portfolio = getPortfolioDataSync();

/**
 * Skills showcase (languages, frameworks, tools, specialties)
 */
export default function SkillsPage(): React.ReactElement {
  const { skills } = portfolio;

  return (
    <div style={{ backgroundColor: colors.primary.navy, minHeight: '100vh' }}>
      <Container>
        <div className="py-20 space-y-12">
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: colors.accent.gold }}
            >
              Skills & Technologies
            </h1>
            <p
              className="text-xl"
              style={{ color: colors.neutral.lightGray }}
            >
              Tools and technologies I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card variant="elevated">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colors.accent.gold }}
              >
                Languages
              </h2>
              <div className="space-y-2">
                {skills.languages.map((lang: string) => (
                  <div
                    key={lang}
                    className="px-4 py-3 rounded-lg"
                    style={{
                      backgroundColor: colors.primary.lightNavy,
                      color: colors.neutral.white,
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="elevated">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colors.accent.gold }}
              >
                Frameworks
              </h2>
              <div className="space-y-2">
                {skills.frameworks.map((framework: string) => (
                  <div
                    key={framework}
                    className="px-4 py-3 rounded-lg"
                    style={{
                      backgroundColor: colors.primary.lightNavy,
                      color: colors.neutral.white,
                    }}
                  >
                    {framework}
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="elevated">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colors.accent.gold }}
              >
                Tools & Platforms
              </h2>
              <div className="space-y-2">
                {skills.tools.map((tool: string) => (
                  <div
                    key={tool}
                    className="px-4 py-3 rounded-lg"
                    style={{
                      backgroundColor: colors.primary.lightNavy,
                      color: colors.neutral.white,
                    }}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="elevated">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colors.accent.gold }}
              >
                Specialties
              </h2>
              <div className="space-y-2">
                {skills.specialties.map((specialty: string) => (
                  <div
                    key={specialty}
                    className="px-4 py-3 rounded-lg"
                    style={{
                      backgroundColor: colors.primary.lightNavy,
                      color: colors.neutral.white,
                    }}
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
