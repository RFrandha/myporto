import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { colors } from '@/styles/theme';
import type { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
}

/**
 * Card showing blog post with title, date, excerpt
 */
export function BlogCard({ post }: BlogCardProps): React.ReactElement {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-transform">
        <div className="flex justify-between items-start mb-3">
          <p
            className="text-sm"
            style={{ color: colors.accent.gold }}
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {post.readingTime && (
            <p
              className="text-xs"
              style={{ color: colors.neutral.lightGray }}
            >
              {post.readingTime}
            </p>
          )}
        </div>
        <h3
          className="text-xl font-bold mb-2 hover:text-gold transition-colors"
          style={{ color: colors.accent.gold }}
        >
          {post.title}
        </h3>
        <p
          className="line-clamp-3"
          style={{ color: colors.neutral.lightGray }}
        >
          {post.excerpt}
        </p>
      </Card>
    </Link>
  );
}
