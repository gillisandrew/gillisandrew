# agillis.dev Technical Blog Specification

## Project Overview

Transform the existing agillis.dev personal portfolio site into a technical blog and knowledge repository. The site will serve as both a public showcase of technical expertise and a personal reference system for tutorials, project documentation, and learning notes.

## Purpose & Goals

- **Primary**: Share technical tutorials and how-to guides
- **Secondary**: Document personal learning journey and projects  
- **Personal**: Create searchable knowledge repository for own reference

## Technical Scope

Content will cover multiple domains:
- Cloud infrastructure (AWS, Azure, GCP)
- DevOps automation tools
- Web development frameworks
- Data science
- Security topics

## Content Organization

- **Tagging System**: Freeform tags created organically (e.g., "terraform", "aws-lambda", "python-scraping", "security-audit")
- **No hierarchical categories** - tags provide sufficient flexibility
- **No content series or difficulty levels** - keep it simple

## Content Creation Workflow

- **Markdown-based**: Write posts as markdown files in git repository
- **Git workflow**: Commit markdown files, auto-deploy on push
- **No drafts, versioning, or scheduling** - publish when ready
- **File structure**: `/content/` directory with date-prefixed filenames
  - Example: `/content/2025-01-19-terraform-best-practices.md`

## Frontmatter Format

```yaml
---
title: "Terraform Best Practices"
date: "2025-01-19"
tags: ["terraform", "aws", "devops"]
---
```

## Site Architecture

### Current Site Transformation
- **Complete conversion**: Transform entire agillis.dev site into blog
- **Homepage**: Simple chronological list of blog posts (latest first)
- **Profile integration**: Abbreviated personal bio at bottom of homepage
- **No separate About page** - keep it minimal

### URL Structure
- Homepage: `https://agillis.dev` (blog post list)
- Individual posts: `https://agillis.dev/[slug]` (derived from filename)
- Clean URLs without `/blog/` prefix

### Navigation
- Minimal header with site title/name
- Tag-based filtering integrated into main navigation
- Post-to-post navigation (previous/next)

## Design & User Experience

### Visual Design
- **Clean minimalist style** - focus on content readability
- **Personal/casual tone** - approachable rather than corporate
- **Code-optimized**: Excellent syntax highlighting and code block presentation
- **Light theme** with potential for dark mode toggle

### Homepage Layout
- Site header with name "Andrew Gillis"
- Subtitle: "Software Engineer & Technical Writer"
- Simple chronological list of posts showing:
  - Post title (linked)
  - Publication date
  - Tag list (clickable)
- Abbreviated bio footer

### Individual Post Pages
- **Post header**: Title, publication date, clickable tags
- **Full markdown content** with rich formatting
- **Post navigation**: Previous/next post links, back to home
- **Tag functionality**: Clickable tags to filter related posts
- **Minimal metadata**: Keep it clean and focused

## Markdown Features & Extensions

Full technical writing support:
- **Code blocks**: Syntax highlighting for multiple languages (JavaScript, Python, Terraform, YAML, etc.)
- **Tables**: For comparisons and structured data
- **Links and images**: Standard embedding with optimization
- **Math expressions**: LaTeX/KaTeX support for data science content
- **Mermaid diagrams**: Architecture diagrams, flowcharts, sequence diagrams
- **Custom components**: Callout boxes, warnings, tips, info blocks
- **Code filename headers**: Display file paths above code blocks
- **Line highlighting**: Emphasize specific lines in code examples

## Technical Implementation

### Platform
- **Next.js** (extending existing agillis.dev application)
- **TypeScript** for type safety
- **Tailwind CSS** for styling consistency

### Content Processing
- **Gray-matter** for frontmatter parsing
- **MDX or similar** for enhanced markdown processing
- **Prism.js or Shiki** for syntax highlighting
- **Mermaid.js** for diagram rendering
- **KaTeX** for mathematical expressions

### File Structure
```
├── content/                    # Blog posts
│   ├── 2025-01-19-terraform-best-practices.md
│   ├── 2025-01-20-aws-lambda-patterns.md
│   └── ...
├── app/
│   ├── page.tsx               # Homepage (blog list)
│   ├── [slug]/
│   │   └── page.tsx           # Individual post pages
│   └── ...
├── lib/
│   ├── posts.ts               # Post parsing utilities
│   └── ...
└── components/
    ├── post-list.tsx
    ├── post-content.tsx
    └── ...
```

## Content Features

### Post List (Homepage)
- Chronological ordering (newest first)
- Post title, date, tags display
- Clickable tags for filtering
- Clean, scannable layout
- Responsive design

### Individual Posts
- Full markdown rendering with all extensions
- Syntax highlighting for code blocks
- Interactive diagrams (Mermaid)
- Math formula rendering
- Table of contents for longer posts
- Estimated reading time
- Tag-based related posts suggestions

### Tagging System
- Freeform tag creation
- Tag clicking filters posts
- Tag cloud or list view option
- No tag hierarchies - keep it flat and flexible

## SEO & Metadata

- **Site title**: "Andrew Gillis - Software Engineer & Technical Writer"
- **Meta description**: "Technical tutorials, project documentation, and software engineering insights covering cloud infrastructure, DevOps, web development, data science, and security."
- **Open Graph**: Proper social sharing previews
- **Structured data**: Blog post markup for search engines

## Performance Requirements

- **Fast loading**: Optimized for technical readers
- **Mobile responsive**: Readable on all devices
- **Syntax highlighting**: Fast rendering of code blocks
- **Image optimization**: Next.js Image component for screenshots/diagrams

## Future Considerations (Out of Scope for V1)

- Full-text search functionality
- Comment system
- Newsletter subscription
- RSS feed
- Advanced analytics
- Multi-author support

## Success Metrics

- **Personal utility**: Easy to create, find, and reference own content
- **Public engagement**: Useful resource for other developers
- **Professional showcase**: Demonstrates expertise across technical domains
- **Knowledge retention**: Effective personal documentation system

---

*This specification serves as the complete blueprint for transforming agillis.dev into a comprehensive technical blog and knowledge repository.*