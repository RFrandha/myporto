import { Container } from '@/components/common/Container';
import { colors } from '@/styles/theme';
import { getBlogPost } from '@/lib/markdown';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Individual blog post page with markdown rendering
 */
export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown to JSX conversion for rendering
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${i}`}
              className="bg-gray-900 text-white p-4 rounded overflow-x-auto my-4"
            >
              <code>{codeContent}</code>
            </pre>
          );
          inCodeBlock = false;
          codeContent = '';
        } else {
          codeLanguage = line.substring(3);
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={`h1-${i}`}
            className="text-4xl font-bold my-6"
            style={{ color: colors.accent.gold }}
          >
            {line.substring(2)}
          </h1>
        );
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={`h2-${i}`}
            className="text-3xl font-bold my-4"
            style={{ color: colors.accent.gold }}
          >
            {line.substring(3)}
          </h2>
        );
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${i}`}
            className="text-2xl font-bold my-3"
            style={{ color: colors.accent.gold }}
          >
            {line.substring(4)}
          </h3>
        );
        continue;
      }

      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        currentList.push(line.substring(2));
        continue;
      } else if (currentList.length > 0) {
        elements.push(
          <ul
            key={`list-${i}`}
            className="list-disc list-inside ml-4 my-4 space-y-2"
          >
            {currentList.map((item, idx) => (
              <li key={idx} style={{ color: colors.neutral.lightGray }}>
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }

      // Tables
      if (line.includes('|')) {
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-4">
            <table className="w-full border-collapse">
              <tbody>
                {lines
                  .slice(i)
                  .filter((l, idx) => idx === 0 || l.includes('|'))
                  .map((row, idx) => (
                    <tr
                      key={idx}
                      className="border"
                      style={{ borderColor: colors.primary.lightNavy }}
                    >
                      {row
                        .split('|')
                        .filter((cell) => cell.trim())
                        .map((cell, cidx) => (
                          <td
                            key={cidx}
                            className="px-4 py-2"
                            style={{ color: colors.neutral.lightGray }}
                          >
                            {cell.trim()}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
        break;
      }

      // Paragraphs
      if (line.trim()) {
        elements.push(
          <p
            key={`p-${i}`}
            className="my-4 leading-relaxed"
            style={{ color: colors.neutral.lightGray }}
          >
            {line}
          </p>
        );
      }
    }

    if (currentList.length > 0) {
      elements.push(
        <ul
          key="final-list"
          className="list-disc list-inside ml-4 my-4 space-y-2"
        >
          {currentList.map((item, idx) => (
            <li key={idx} style={{ color: colors.neutral.lightGray }}>
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div style={{ backgroundColor: colors.primary.navy, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <article className="py-20 space-y-6">
          <div className="border-b pb-8" style={{ borderColor: colors.primary.lightNavy }}>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colors.accent.gold }}
            >
              {post.title}
            </h1>
            <div
              className="flex gap-4 flex-wrap"
              style={{ color: colors.neutral.lightGray }}
            >
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {post.readingTime && <span>•</span>}
              {post.readingTime && <span>{post.readingTime}</span>}
              {post.author && <span>by {post.author}</span>}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {post.content && renderMarkdown(post.content)}
          </div>
        </article>
      </Container>
    </div>
  );
}
