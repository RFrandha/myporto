import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { ContactForm } from '@/components/forms/ContactForm';
import { colors } from '@/styles/theme';

/**
 * Contact page with ContactForm component
 */
export default function ContactPage(): React.ReactElement {
  return (
    <div style={{ backgroundColor: colors.primary.navy, minHeight: '100vh' }}>
      <Container>
        <div className="py-20 space-y-12">
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: colors.accent.gold }}
            >
              Get In Touch
            </h1>
            <p
              className="text-xl"
              style={{ color: colors.neutral.lightGray }}
            >
              Have a question or project proposal? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card variant="elevated">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.accent.gold }}
                >
                  Contact Information
                </h3>
                <p
                  className="text-sm"
                  style={{ color: colors.neutral.lightGray }}
                >
                  Feel free to reach out via email or social media.
                </p>
              </Card>

              <Card>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: colors.accent.gold }}
                >
                  Email
                </h4>
                <a
                  href="mailto:restow.frandha@gmail.com"
                  style={{ color: colors.neutral.white }}
                  className="hover:text-gold transition-colors"
                >
                  restow.frandha@gmail.com
                </a>
              </Card>

              <Card>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: colors.accent.gold }}
                >
                  Location
                </h4>
                <p style={{ color: colors.neutral.lightGray }}>
                  Jakarta, Indonesia
                </p>
              </Card>

              <Card>
                <h4
                  className="font-semibold mb-4"
                  style={{ color: colors.accent.gold }}
                >
                  Social Links
                </h4>
                <div className="space-y-2">
                  <a
                    href="https://github.com/RFrandha"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: colors.accent.gold }}
                    className="hover:underline block"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/restow-frandha"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: colors.accent.gold }}
                    className="hover:underline block"
                  >
                    LinkedIn
                  </a>
                </div>
              </Card>
            </div>

            <Card variant="elevated">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colors.accent.gold }}
              >
                Send Me a Message
              </h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
