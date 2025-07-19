# agillis.dev

Andrew Gillis's personal website and portfolio. A modern, responsive web application built with Next.js showcasing professional background, skills, and contact information.

## Project Overview

This is a personal portfolio website for Andrew Gillis, a Montreal-based software designer and developer specializing in infrastructure as code on AWS. The site features a clean, minimalist design with social media integration and contact functionality.

## Tech Stack

- **Framework**: Next.js 14.2.15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: 
  - Radix UI primitives (@radix-ui/react-*)
  - shadcn/ui component library
  - Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Email**: AWS SES v2 for contact form submissions
- **Security**: Cloudflare Turnstile for bot protection
- **Fonts**: Geist and Geist Mono (optimized with next/font)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js App Router pages and layouts
│   ├── api/
│   │   └── contact/        # Contact form API endpoint with AWS SES
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx           # Homepage component
│   └── [static assets]     # Favicons, images, fonts
├── components/             # Reusable React components
│   ├── ui/                # shadcn/ui component library
│   ├── contact-card.tsx   # Contact form component
│   └── social.tsx         # Social media navigation
├── lib/                   # Utility functions and schemas
│   ├── schema.ts          # Zod validation schemas
│   └── utils.ts           # Utility functions (cn, etc.)
└── [config files]         # TypeScript, Tailwind, Next.js config
```

### Key Components

- **Homepage** (`app/page.tsx`): Main landing page with profile information
- **Contact Form** (`components/contact-card.tsx`): Form with AWS SES integration and Turnstile protection
- **Social Navigation** (`components/social.tsx`): Links to social media profiles
- **API Route** (`app/api/contact/route.ts`): Handles form submissions via AWS SES

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

For the contact form to work, you'll need to set up the following environment variables:

```bash
# AWS SES Configuration
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
SES_FROM_EMAIL=your-verified-email@domain.com
SES_TO_EMAIL=recipient@domain.com

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

## Deployment

This application is designed to be deployed on Vercel, but can be deployed to any platform supporting Next.js:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on pushes to main branch

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Ensure environment variables are configured

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable component library
- [AWS SES](https://docs.aws.amazon.com/ses/) - Email service documentation
