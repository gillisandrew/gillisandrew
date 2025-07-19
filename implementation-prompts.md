# Implementation Prompts for agillis.dev Technical Blog

## Overview

Each prompt below is designed to be used with a code-generation LLM to implement one specific step of the blog transformation. The prompts are ordered sequentially and each builds upon the previous implementations.

---

## Step 1: Project Setup & Dependencies

### Context
We're transforming an existing Next.js personal portfolio site into a technical blog. This is the first step to install all necessary dependencies for markdown processing, syntax highlighting, and content management.

### Implementation Prompt

```text
I'm transforming my existing Next.js personal portfolio site into a technical blog. I need to install and configure all the necessary dependencies for a modern markdown-based blog.

Please help me install the following packages and explain their purpose:

Required packages:
- gray-matter (frontmatter parsing)
- @mdx-js/loader and @mdx-js/react (enhanced markdown processing)  
- shiki (syntax highlighting)
- mermaid (diagram rendering)
- katex (math expressions)
- date-fns (date formatting and manipulation)

Additional considerations:
- I'm using Next.js 14+ with App Router
- TypeScript is already configured
- I prefer using npm for package management

After installation, please show me how to configure these packages for a Next.js application, including any necessary next.config.js modifications for MDX processing.

Create a brief setup checklist so I can verify everything is working correctly.
```

---

## Step 2: Content Structure

### Context
With dependencies installed, we need to create the content directory structure and establish the blog post format with consistent frontmatter schema.

### Implementation Prompt

```text
I'm setting up the content structure for my Next.js technical blog. I need to create a content directory with sample blog posts that follow a consistent format.

Requirements:
- Create a `/content` directory in the project root
- File naming convention: `YYYY-MM-DD-slug.md`
- Consistent frontmatter schema with title, date, and tags
- Create 3-5 sample blog posts covering different technical topics

Frontmatter format should be:
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
---
```

Sample posts should cover these topics:
1. A Terraform best practices guide
2. AWS Lambda deployment patterns  
3. Next.js performance optimization
4. Python data analysis techniques
5. DevOps automation tools

Each post should have:
- Realistic technical content (at least 200-300 words)
- Code examples with syntax highlighting
- Practical tips or tutorials
- Relevant tags for the topic area

Please create the directory structure and sample content files, ensuring the frontmatter is consistent and the content is substantial enough for testing the blog functionality.
```

---

## Step 3: Core Utilities

### Context  
Now we need to build the TypeScript utilities that will parse our markdown content, extract frontmatter, and provide functions for the Next.js app to consume blog data.

### Implementation Prompt

```text
I need to create core utility functions for processing markdown blog posts in my Next.js application. These functions will be used throughout the app to load, parse, and format blog content.

Requirements:
1. Create TypeScript type definitions for blog posts
2. Build utility functions for file system operations and content parsing
3. Implement functions to get all posts, individual posts, and post metadata
4. Use gray-matter for frontmatter parsing
5. Handle slug generation from filenames

TypeScript interface needed:
```typescript
interface Post {
  slug: string;
  title: string;  
  date: string;
  tags: string[];
  content: string;
  excerpt?: string;
}
```

Core functions to implement:
- `getAllPosts()`: Return array of all posts with metadata, sorted by date (newest first)
- `getPostBySlug(slug: string)`: Return full post content for a specific slug  
- `getPostSlugs()`: Return array of all available post slugs
- `parsePostContent(fileContents: string)`: Parse markdown content and frontmatter
- `generateExcerpt(content: string)`: Create post excerpt from content

Additional requirements:
- Handle errors gracefully (missing files, invalid frontmatter)
- Optimize for performance (consider caching strategies)
- Include proper TypeScript typing throughout
- Create the files in `/lib/posts.ts` and `/types/blog.ts`

Please implement these utilities with proper error handling and type safety, and include example usage for each function.
```

---

## Step 4: Homepage Blog List

### Context
Transform the existing homepage into a blog post listing. This involves updating the main page component to display posts chronologically with proper metadata.

### Implementation Prompt

```text
I need to transform my existing Next.js homepage into a blog post listing page. The homepage should display all blog posts in chronological order (newest first) with a clean, professional layout.

Current setup:
- Next.js 14 with App Router
- Tailwind CSS for styling  
- TypeScript throughout
- Blog post utilities already implemented in `/lib/posts.ts`

Homepage requirements:
- Site header with "Andrew Gillis" as the main title
- Subtitle: "Software Engineer & Technical Writer"  
- Chronological list of blog posts showing:
  - Post title (linked to individual post)
  - Publication date (formatted nicely)
  - Tag list (styled as badges)
- Abbreviated bio footer
- Fully responsive design

Components to create:
1. `<PostList />` - Main container for blog post listing
2. `<PostListItem />` - Individual post preview component  
3. `<SiteHeader />` - Site branding and title
4. `<TagBadge />` - Individual tag styling
5. `<BioFooter />` - Brief personal bio section

Design specifications:
- Clean, minimalist aesthetic focused on readability
- Mobile-first responsive design
- Professional typography hierarchy
- Subtle hover effects on interactive elements
- Consistent spacing using Tailwind utilities

Please implement the homepage transformation with all components, ensuring the design is professional, responsive, and optimized for technical content consumption. Include proper TypeScript typing and integrate with the existing post utilities.
```

---

## Step 5: Individual Post Pages

### Context
Create dynamic routing for individual blog posts. Each post needs its own page with full markdown rendering and proper metadata display.

### Implementation Prompt

```text
I need to implement dynamic routing for individual blog posts in my Next.js app. Each post should have its own page with full markdown content rendering and proper navigation.

Current setup:
- Next.js 14 with App Router
- Blog post utilities in `/lib/posts.ts`
- Content directory with markdown files
- Tailwind CSS for styling

Requirements:
1. Dynamic route structure: `/app/[slug]/page.tsx`
2. Clean URLs without `/blog/` prefix (e.g., `agillis.dev/terraform-best-practices`)
3. Full markdown rendering with proper styling
4. Post metadata display (title, date, tags)
5. Navigation elements (back to home, previous/next posts)

Components to create:
- `<PostHeader />` - Display title, date, and tags
- `<PostContent />` - Render markdown content with styling  
- `<PostNavigation />` - Previous/next post links and back to home
- `<MarkdownRenderer />` - Handle markdown-to-HTML conversion

Page functionality:
- Generate static paths for all posts (use generateStaticParams)
- Handle 404 for non-existent posts gracefully
- SEO-friendly meta tags for each post
- Responsive design for all screen sizes

Styling requirements:
- Typography optimized for long-form reading
- Proper spacing and line height for readability
- Code blocks styled but not yet syntax highlighted (that comes later)
- Professional appearance matching homepage design
- Clear visual hierarchy with headings, paragraphs, lists

Please implement the dynamic post routing with all components, ensuring proper error handling, SEO optimization, and responsive design. Include TypeScript typing throughout.
```

---

## Step 6: Navigation & Layout

### Context
Establish consistent site-wide navigation and layout structure. This includes navigation between posts and maintaining layout consistency across all pages.

### Implementation Prompt

```text
I need to implement comprehensive site navigation and layout structure for my Next.js technical blog. This includes site-wide navigation, post-to-post navigation, and consistent layout across all pages.

Current setup:
- Homepage with blog post list implemented
- Individual post pages with dynamic routing
- Next.js 14 App Router
- Tailwind CSS styling

Navigation requirements:
1. Site-wide header on all pages with consistent branding
2. Back to home functionality from post pages
3. Previous/next post navigation on individual posts
4. Breadcrumb-style navigation for user orientation
5. Mobile-responsive navigation menu

Layout components to create:
- `<Layout />` - Site-wide wrapper component
- `<SiteNavigation />` - Main navigation component
- `<PostNavigation />` - Post-specific navigation (prev/next)
- `<Breadcrumbs />` - Page location indicator

Navigation features:
- "Andrew Gillis" site title always links to homepage
- Clean, minimal navigation without overwhelming the content
- Previous/next post links with post titles
- Visual indicators for current page/section
- Responsive behavior for mobile devices

Layout structure:
- Consistent header across all pages
- Main content area with proper max-width and centering
- Footer area for additional information
- Proper spacing and typography hierarchy

Technical implementation:
- Use Next.js Link components for performance
- Implement proper keyboard navigation
- Include accessibility attributes (ARIA labels, semantic HTML)
- Optimize for SEO with proper heading structure

Please implement the navigation and layout system with all components, ensuring accessibility, responsive design, and consistent user experience across the entire site.
```

---

## Step 7: Markdown Extensions

### Context
Implement advanced markdown features including syntax highlighting, enhanced code blocks, and rich content formatting. This is crucial for technical blog content.

### Implementation Prompt

```text
I need to implement advanced markdown processing features for my Next.js technical blog, focusing on syntax highlighting and enhanced code block presentation that's essential for technical content.

Current setup:
- Individual blog posts rendering basic markdown
- Next.js 14 with App Router  
- Shiki installed for syntax highlighting
- Blog posts with technical content and code examples

Advanced features to implement:
1. Syntax highlighting with Shiki for multiple programming languages
2. Enhanced code blocks with language labels
3. Line highlighting capabilities for code examples
4. Filename headers for code blocks
5. Professional table styling
6. Optimized image and link processing

Technical requirements:
- Support for JavaScript, TypeScript, Python, Terraform, YAML, JSON, Bash
- Dark theme syntax highlighting (to match site aesthetic)
- Copy-to-clipboard functionality for code blocks
- Line numbering option for longer code examples
- Responsive code block design for mobile devices

Components to create/enhance:
- `<CodeBlock />` - Enhanced code display with syntax highlighting
- `<CodeHeader />` - Filename and language display
- `<MarkdownRenderer />` - Enhanced markdown processing
- `<TableWrapper />` - Styled table container

Styling specifications:
- Code blocks with subtle borders and background
- Consistent font sizing and spacing
- Mobile-responsive horizontal scrolling for wide code
- Professional color scheme for syntax highlighting
- Clear visual distinction between inline code and code blocks

Configuration needed:
- Shiki setup with theme configuration
- Language pack loading for common technical languages
- Performance optimization for syntax highlighting
- Integration with existing markdown rendering pipeline

Please implement the advanced markdown features with focus on code presentation, ensuring excellent readability, performance, and responsive design for technical content.
```

---

## Step 8: Tagging System

### Context
Implement a comprehensive tagging system that allows content discovery and filtering. Tags should be displayed on posts and provide navigation functionality.

### Implementation Prompt

```text
I need to implement a comprehensive tagging system for my Next.js technical blog that enables content discovery and filtering. The system should be intuitive and help users find related technical content.

Current setup:
- Blog posts with tags in frontmatter
- Homepage listing and individual post pages working
- Next.js 14 App Router with TypeScript

Tagging system requirements:
1. Display tags on homepage post list and individual post pages
2. Clickable tags that filter posts by tag
3. Tag-based post filtering functionality  
4. Tag pages showing all posts with specific tag
5. Related posts suggestions based on shared tags

Features to implement:
- Tag display as styled badges/chips
- Tag filtering on homepage with URL state management
- Dedicated tag pages at `/tags/[tag]`
- Tag cloud or organized tag list
- "Related Posts" section on individual posts

Components to create:
- `<Tag />` - Individual tag component with styling
- `<TagList />` - Container for multiple tags
- `<TagFilter />` - Tag-based filtering interface
- `<RelatedPosts />` - Show posts with similar tags
- `<TagCloud />` - Overview of all available tags

Technical implementation:
- URL-based tag filtering (e.g., `/?tag=terraform`)
- Static generation for tag pages
- Tag frequency counting and sorting
- Tag normalization (consistent case, formatting)
- Performance optimization for tag operations

UI/UX considerations:
- Clear visual distinction for active/filtered tags
- Responsive tag display that works on mobile
- Intuitive interaction patterns (clicking tags to filter)
- Loading states when filtering content
- Clear way to remove filters and return to all posts

Please implement the complete tagging system with all components, ensuring good performance, intuitive UX, and proper TypeScript typing throughout. The system should make technical content easily discoverable and navigable.
```

---

## Step 9: Advanced Content Features

### Context
Add support for Mermaid diagrams, math expressions, and custom markdown components. These features are essential for technical writing and documentation.

### Implementation Prompt

```text
I need to implement advanced content features for my technical blog including diagram support, mathematical expressions, and custom markdown components for enhanced technical writing.

Current setup:
- Markdown rendering with syntax highlighting working
- Next.js 14 with TypeScript
- Mermaid and KaTeX dependencies installed
- Technical blog posts that could benefit from diagrams and math

Advanced features to implement:
1. Mermaid.js integration for technical diagrams (flowcharts, sequence diagrams, architecture diagrams)
2. KaTeX support for mathematical expressions and formulas
3. Custom markdown components for callouts, warnings, tips
4. Enhanced image handling with captions and optimization
5. Table of contents generation for longer posts

Mermaid diagram support:
- Render flowcharts, sequence diagrams, network diagrams
- Support for architecture documentation
- Responsive diagram scaling
- Theme integration (light/dark mode consideration)

Math expression support:
- Inline and block mathematical expressions
- LaTeX syntax compatibility
- Proper rendering for data science and engineering content
- Responsive scaling on mobile devices

Custom components to create:
- `<MermaidDiagram />` - Diagram rendering component
- `<MathExpression />` - Math formula rendering
- `<Callout />` - Info, warning, tip boxes
- `<TableOfContents />` - Auto-generated TOC
- `<ImageWithCaption />` - Enhanced image display

Technical considerations:
- Client-side rendering for interactive diagrams
- Performance optimization (lazy loading for heavy content)
- SEO considerations for dynamically rendered content
- Accessibility for screen readers
- Mobile optimization for complex diagrams

Integration requirements:
- Seamless integration with existing markdown pipeline
- Custom MDX components that work with gray-matter
- Proper TypeScript typing for all components
- Error handling for malformed diagrams or expressions

Please implement these advanced content features with focus on technical writing needs, ensuring excellent performance, accessibility, and responsive design.
```

---

## Step 10: Design & Styling

### Context
Apply comprehensive design system and styling to create a professional, code-focused aesthetic. This involves detailed Tailwind CSS implementation and responsive design refinement.

### Implementation Prompt

```text
I need to implement a comprehensive design system and styling for my technical blog using Tailwind CSS. The design should be clean, professional, and optimized for technical content readability.

Current setup:
- All blog functionality implemented (posts, tags, navigation, advanced features)
- Tailwind CSS installed and configured
- Next.js 14 with TypeScript
- Focus on technical writing and code presentation

Design requirements:
1. Clean, minimalist aesthetic with professional appearance
2. Typography system optimized for long-form technical reading
3. Code-first design with excellent code block presentation
4. Responsive design that works beautifully on all devices
5. Consistent spacing, colors, and visual hierarchy

Typography and readability:
- Font selections for headers, body text, and code
- Proper line height and spacing for technical content
- Clear visual hierarchy with consistent heading styles
- Optimized reading width and content layout
- High contrast for accessibility

Color scheme:
- Professional color palette suitable for technical content
- Subtle use of color to enhance rather than distract
- Consistent accent colors for interactive elements
- Consideration for syntax highlighting color harmony
- Accessibility-compliant contrast ratios

Component styling:
- Polished homepage post list with hover effects
- Beautiful individual post pages with reading optimization
- Elegant tag system with cohesive badge design
- Professional navigation with clear interaction states
- Enhanced code blocks with refined syntax highlighting presentation

Responsive design:
- Mobile-first approach with progressive enhancement
- Tablet and desktop optimizations
- Proper handling of wide code blocks on mobile
- Touch-friendly interactive elements
- Performance optimization for all screen sizes

Layout and spacing:
- Consistent spacing scale using Tailwind utilities
- Proper content width limits for optimal reading
- Strategic use of whitespace for visual breathing room
- Grid systems for complex layouts
- Vertical rhythm consistency

Please implement the complete design system with detailed styling for all components, ensuring the result is visually professional, highly readable, and optimized for technical content consumption across all devices.
```

---

## Step 11: SEO & Metadata

### Context
Implement comprehensive SEO optimization including meta tags, Open Graph support, and structured data markup for search engine visibility and social sharing.

### Implementation Prompt

```text
I need to implement comprehensive SEO optimization and metadata management for my Next.js technical blog to ensure excellent search engine visibility and social sharing capabilities.

Current setup:
- Fully functional blog with posts, tags, and navigation
- Next.js 14 App Router with TypeScript
- Individual blog posts and homepage complete
- Focus on technical content and professional presentation

SEO requirements:
1. Dynamic meta tags for homepage and individual posts
2. Open Graph tags for social media sharing
3. Twitter Card support for Twitter sharing
4. JSON-LD structured data for blog posts
5. XML sitemap generation
6. Robots.txt configuration

Metadata implementation:
- Post-specific titles and descriptions
- Automatic excerpt generation for meta descriptions
- Canonical URLs for all pages
- Author information and publication dates
- Category and tag information in structured data

Open Graph optimization:
- Dynamic OG titles, descriptions, and images
- Proper OG type definitions (website, article)
- Social sharing preview optimization
- Twitter Card integration with appropriate metadata

Technical implementation:
- Use Next.js metadata API for dynamic meta tags
- Generate JSON-LD structured data for each post
- Implement sitemap generation for all posts
- Configure robots.txt for proper search engine access
- Performance optimization for metadata generation

SEO best practices:
- Proper heading hierarchy (H1, H2, H3) in content
- Internal linking between related posts
- Image alt text optimization
- Loading performance optimization
- Mobile-friendly meta viewport configuration

Components to create/enhance:
- `<SEOHead />` - Dynamic meta tag generation
- `<StructuredData />` - JSON-LD schema markup
- Sitemap generation utility
- Metadata extraction from post content

Please implement comprehensive SEO optimization with all metadata features, ensuring the blog is fully optimized for search engines, social sharing, and professional web presence. Include proper TypeScript typing and integration with existing blog functionality.
```

---

## Step 12: Performance & Testing

### Context
Final optimization phase focusing on performance improvements, comprehensive testing, and production readiness. This ensures the blog is fast, reliable, and ready for deployment.

### Implementation Prompt

```text
I need to optimize performance and implement comprehensive testing for my Next.js technical blog to ensure it's production-ready with excellent performance metrics.

Current setup:
- Complete blog functionality with all features implemented
- SEO and metadata optimization complete
- Next.js 14 with TypeScript and Tailwind CSS
- Ready for performance optimization and testing

Performance optimization requirements:
1. Core Web Vitals optimization (LCP, FID, CLS)
2. Code splitting and lazy loading implementation  
3. Image optimization and responsive images
4. Bundle size analysis and optimization
5. Caching strategies for static content

Performance areas to optimize:
- Syntax highlighting performance (lazy load Shiki)
- Mermaid diagram rendering (lazy loading)
- Image optimization with Next.js Image component
- Font loading optimization
- JavaScript bundle size reduction

Testing implementation:
- Unit tests for utility functions (/lib/posts.ts)
- Component testing for key UI components
- Integration tests for post rendering pipeline
- End-to-end tests for critical user journeys
- Performance testing and monitoring

Testing areas to cover:
- Post parsing and metadata extraction
- Tag filtering and navigation
- Markdown rendering with advanced features
- Responsive design across breakpoints
- SEO metadata generation

Performance monitoring:
- Core Web Vitals measurement setup
- Bundle analyzer integration
- Performance budgets and alerting
- Lighthouse CI integration
- Real user monitoring consideration

Production readiness:
- Environment-specific configuration
- Error handling and graceful degradation
- Loading states and skeleton screens
- Accessibility testing and improvements
- Cross-browser compatibility verification

Tools to integrate:
- Jest and React Testing Library for unit/component tests
- Playwright or Cypress for E2E testing
- Webpack Bundle Analyzer for performance analysis
- Lighthouse for performance auditing

Please implement comprehensive performance optimization and testing coverage, ensuring the blog achieves excellent Core Web Vitals scores, maintains fast loading times, and provides a reliable user experience across all devices and browsers.
```

---

## GitHub Issues Creation

The following GitHub issues should be created for project management:

### Epic: Blog Transformation
**Title**: Transform agillis.dev into Technical Blog  
**Labels**: epic, enhancement  
**Description**: Complete transformation of personal portfolio into comprehensive technical blog

### Individual Issues:

1. **Setup Dependencies** - Install markdown processing packages
2. **Content Structure** - Create content directory and sample posts  
3. **Core Utilities** - Build post parsing and utility functions
4. **Homepage Blog List** - Transform homepage to blog post listing
5. **Individual Post Pages** - Implement dynamic routing for posts
6. **Navigation & Layout** - Site-wide navigation and layout structure
7. **Markdown Extensions** - Syntax highlighting and advanced formatting
8. **Tagging System** - Tag-based content discovery and filtering  
9. **Advanced Content** - Mermaid diagrams, math expressions, custom components
10. **Design & Styling** - Comprehensive Tailwind CSS design system
11. **SEO & Metadata** - Search engine optimization and social sharing
12. **Performance & Testing** - Optimization, testing, and production readiness

Each issue should include:
- Detailed description from the corresponding implementation prompt
- Acceptance criteria based on deliverables
- Labels for categorization (frontend, backend, testing, etc.)
- Time estimates based on complexity ratings
- Dependencies on previous issues

---

This implementation guide provides a complete roadmap for transforming the personal portfolio into a professional technical blog with all modern features and best practices.