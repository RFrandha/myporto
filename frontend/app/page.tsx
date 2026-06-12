'use client';

import dynamic from 'next/dynamic';
import { colors } from '@/styles/theme';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { DiagonalDivider } from '@/components/common/DiagonalDivider';
import { Card } from '@/components/common/Card';
import { getPortfolioDataSync } from '@/lib/portfolio';

const Hero = dynamic(() => import('@/components/sections/Hero').then(mod => mod.Hero), { ssr: false });

const portfolio = getPortfolioDataSync();

export default function Home(): React.ReactElement {
  return (
    <div>
      <Hero />
      <DiagonalDivider color={colors.primary.light} />

      {/* About Section */}
      <section id="about" className="py-20 px-4" style={{ backgroundColor: colors.primary.light }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.accent.main }}>
              About Me
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Card variant="elevated" className="max-w-3xl mx-auto text-center">
              <p className="text-lg leading-relaxed" style={{ color: colors.neutral.lightGray }}>
                {portfolio.about.summary}
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>
      <DiagonalDivider color={colors.primary.main} direction="up" />

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4" style={{ backgroundColor: colors.primary.main }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.accent.main }}>
              Experience
            </h2>
          </AnimatedSection>
          <StaggerContainer className="space-y-6">
            {portfolio.experience.map((job, idx) => (
              <StaggerItem key={idx}>
                <Card className="border-l-4" style={{ borderLeftColor: colors.accent.main }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.accent.main }}>{job.position}</h3>
                      <p className="text-lg" style={{ color: colors.neutral.white }}>{job.company}</p>
                    </div>
                    <p className="text-sm" style={{ color: colors.neutral.lightGray }}>{job.period}</p>
                  </div>
                  <p className="mb-4" style={{ color: colors.neutral.lightGray }}>{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: colors.primary.light, color: colors.accent.main }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <DiagonalDivider color={colors.primary.dark} />

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4" style={{ backgroundColor: colors.primary.dark }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.accent.main }}>
              Skills
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <Card variant="elevated">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.accent.main }}>Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: colors.primary.light, color: colors.neutral.white }}>{lang}</span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card variant="elevated">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.accent.main }}>Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.frameworks.map((fw) => (
                    <span key={fw} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: colors.primary.light, color: colors.neutral.white }}>{fw}</span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card variant="elevated">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.accent.main }}>Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: colors.primary.light, color: colors.neutral.white }}>{tool}</span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card variant="elevated">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.accent.main }}>Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.specialties?.slice(0, 4).map((spec) => (
                    <span key={spec} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: colors.primary.light, color: colors.neutral.white }}>{spec}</span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
      <DiagonalDivider color={colors.primary.main} direction="up" />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4" style={{ backgroundColor: colors.primary.main }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.accent.main }}>
              Projects
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.projects.map((project, idx) => (
              <StaggerItem key={idx}>
                <Card variant="elevated" className="h-full">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.accent.main }}>{project.title}</h3>
                  {project.company && <p className="text-sm mb-2" style={{ color: colors.accent.secondary || colors.accent.main }}>{project.company}</p>}
                  <p className="mb-4 text-sm" style={{ color: colors.neutral.lightGray }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs rounded" style={{ backgroundColor: colors.primary.light, color: colors.accent.main }}>{tech}</span>
                    ))}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <DiagonalDivider color={colors.primary.dark} />

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4" style={{ backgroundColor: colors.primary.dark }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.accent.main }}>
              Blog
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {portfolio.blog.map((post, idx) => (
              <StaggerItem key={idx}>
                <a href={`/blog/${post.slug}`}>
                  <Card variant="elevated" className="h-full hover:scale-105 transition-transform cursor-pointer">
                    <p className="text-sm mb-2" style={{ color: colors.accent.main }}>{post.date}</p>
                    <h3 className="text-lg font-bold mb-2" style={{ color: colors.neutral.white }}>{post.title}</h3>
                    <p className="text-sm" style={{ color: colors.neutral.lightGray }}>{post.excerpt}</p>
                  </Card>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <DiagonalDivider color={colors.primary.main} direction="up" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4" style={{ backgroundColor: colors.primary.main }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.accent.main }}>
              Contact
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Card variant="elevated" className="max-w-xl mx-auto text-center">
              <p className="mb-6" style={{ color: colors.neutral.lightGray }}>
                Feel free to reach out for collaborations or just a friendly hello!
              </p>
              <a
                href="mailto:restow.frandha@gmail.com"
                className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{ background: colors.accentGradient, color: colors.primary.dark }}
              >
                Send Email
              </a>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
