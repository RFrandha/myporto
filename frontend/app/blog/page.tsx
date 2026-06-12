import { Container } from '@/components/common/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { colors } from '@/styles/theme';
import { getAllBlogPosts } from '@/lib/markdown';

/**
 * Blog listing page showing all blog posts
 */
export default async function BlogPage(): Promise<React.ReactElement> {
  const posts = await getAllBlogPosts();

  return (
    <div style={{ backgroundColor: colors.primary.main, minHeight: '100vh' }}>
      <Container>
        <div className="py-20 space-y-12">
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: colors.accent.main }}
            >
              Blog
            </h1>
            <p
              className="text-xl"
              style={{ color: colors.neutral.lightGray }}
            >
              Articles on backend architecture, APIs, and system design
            </p>
          </div>

          {posts.length === 0 ? (
            <p
              className="text-lg"
              style={{ color: colors.neutral.lightGray }}
            >
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
