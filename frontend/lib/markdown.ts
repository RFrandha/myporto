import { readFileSync } from 'fs';
import { join } from 'path';
import { BlogPost } from './types';

const BLOG_DIR = join(process.cwd(), 'content', 'blog');

/**
 * Parse markdown frontmatter and content
 */
function parseFrontmatter(content: string): {
  frontmatter: Record<string, any>;
  content: string;
} {
  const lines = content.split('\n');
  let i = 0;
  const frontmatter: Record<string, any> = {};

  // Skip first line if it's empty
  if (lines[0].trim() === '') {
    i = 1;
  }

  // Parse frontmatter (simple key: value format)
  while (i < lines.length && lines[i].trim() !== '') {
    const line = lines[i];
    if (line.startsWith('#')) {
      break;
    }
    i++;
  }

  // Rest is content
  const markdownContent = lines.slice(i).join('\n');
  return { frontmatter, content: markdownContent };
}

/**
 * Calculate reading time for markdown content
 */
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get a blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(BLOG_DIR, `${slug}.md`);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { content } = parseFrontmatter(fileContent);

    // Extract title from first heading
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    // Extract excerpt from first paragraph
    const excerptMatch = content.match(/^(?!#|>|\*)(.+)$/m);
    const excerpt = excerptMatch ? excerptMatch[1].substring(0, 150) : '';

    return {
      title,
      slug,
      date: new Date().toISOString().split('T')[0],
      excerpt,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    return null;
  }
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts: BlogPost[] = [];
    const files = require('fs').readdirSync(BLOG_DIR);

    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        const post = await getBlogPost(slug);
        if (post) {
          posts.push(post);
        }
      }
    }

    return posts.sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
}

/**
 * Convert simple markdown to HTML (basic implementation)
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 className="text-xl font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 className="text-2xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 className="text-3xl font-bold mb-4">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto"><code>$2</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code className="bg-gray-200 px-2 py-1 rounded text-sm">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-blue-600 hover:underline">$1</a>');

  // Lists
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, '<ul className="list-disc list-inside ml-4 mb-2">$1</ul>');

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.includes('<')) {
      return `<p className="mb-4 leading-relaxed">${para.trim()}</p>`;
    }
    return para;
  }).join('\n');

  return html;
}
