# Graph Report - .  (2026-06-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 115 nodes · 242 edges · 9 communities (6 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3be4f79e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]

## God Nodes (most connected - your core abstractions)
1. `colors` - 17 edges
2. `Container()` - 9 edges
3. `Card()` - 8 edges
4. `handleContactForm()` - 7 edges
5. `ApiClient` - 7 edges
6. `ApiResponse` - 7 edges
7. `logger` - 6 edges
8. `getBlogPost()` - 6 edges
9. `internalErrorResponse()` - 5 edges
10. `getPortfolioDataSync()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `BlogCardProps` --references--> `BlogPost`  [EXTRACTED]
  frontend/components/blog/BlogCard.tsx → shared/types.ts
- `BlogPostPage()` --calls--> `getBlogPost()`  [EXTRACTED]
  frontend/app/blog/[slug]/page.tsx → frontend/lib/markdown.ts
- `handleContactForm()` --calls--> `sendContactEmail()`  [EXTRACTED]
  backend/src/handlers/contactHandler.ts → backend/src/services/emailService.ts
- `handleContactForm()` --calls--> `validateContactForm()`  [EXTRACTED]
  backend/src/handlers/contactHandler.ts → backend/src/services/validationService.ts
- `handleContactForm()` --calls--> `internalErrorResponse()`  [EXTRACTED]
  backend/src/handlers/contactHandler.ts → backend/src/utils/responses.ts

## Import Cycles
- None detected.

## Communities (9 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (18): geistMono, geistSans, metadata, viewport, Button(), ButtonProps, Footer(), SOCIAL_LINKS (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (16): handleContactForm(), errorHandler(), requestLogger(), router, sendContactEmail(), transporter, contactSchema, validateContactForm() (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (11): portfolio, Card(), CardProps, Container(), ContainerProps, portfolio, ContactForm(), getPortfolioDataSync() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.29
Nodes (6): BlogCardProps, ApiClient, ApiResponse, BlogPost, ContactFormData, PortfolioData

### Community 4 - "Community 4"
Cohesion: 0.24
Nodes (9): BlogCard(), BlogPage(), BLOG_DIR, calculateReadingTime(), getAllBlogPosts(), getBlogPost(), parseFrontmatter(), BlogPostPage() (+1 more)

## Knowledge Gaps
- **28 isolated node(s):** `app`, `transporter`, `contactSchema`, `EnvironmentConfig`, `portfolio` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `colors` connect `Community 0` to `Community 2`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `ApiClient` connect `Community 3` to `Community 0`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `app`, `transporter`, `contactSchema` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12169312169312169 - nodes in this community are weakly interconnected._