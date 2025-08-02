# School Website Application - Colégio OSE

## Overview
This is a modern, full-stack school website application for "Colégio OSE," a comprehensive school management system. It showcases academic programs, faculty, news, testimonials, and handles contact inquiries. The application is designed to provide a rich online presence and efficient management for the institution, aiming to be the primary digital platform for students, parents, and prospective families.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS with custom school branding
- **UI Components**: Radix UI with shadcn/ui
- **Form Handling**: React Hook Form with Zod
- **Build Tool**: Vite
- **UI/UX Decisions**: Glassmorphism design system applied site-wide, responsive design, professional typography (Merriweather for headlines, Source Sans Pro for body), standardized hero sections, unified image management with drag-and-drop positioning, and animated gradient backgrounds with floating orbs.

### Backend
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon Database)
- **API**: RESTful API design
- **Authentication**: Secure, session-based authentication with bcrypt hashing, rate limiting, CSRF protection, and secure cookies.

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Drizzle ORM
- **Provider**: Neon Database
- **Schema Management**: Drizzle Kit

### Key Features & Implementations
- **Comprehensive Data Model**: Programs, Faculty, News, Testimonials, Contacts, Material Lists.
- **Image Management**: Server-side image handling, optimized image component, drag-and-drop positioning, and dedicated Instagram image management.
- **Content Management**: Visual composer with auto-save, Enhanced Image Selector with server browser and upload.
- **External Integrations**: Forms.app for scholarship registration, Calendly widget.
- **SEO**: Dynamic SEO component with meta tags, Open Graph, Twitter Cards, structured data (JSON-LD), canonical URLs, and XML sitemap generation.
- **URL Structure**: Shortened, SEO-friendly URL routing for all pages.
- **Deployment Consistency**: System to ensure image and page configurations are consistent between development and production environments.

## External Dependencies
- **@neondatabase/serverless**: For PostgreSQL connection.
- **drizzle-orm**: For database interactions.
- **@tanstack/react-query**: For server state management.
- **@radix-ui/***: For UI primitives.
- **react-hook-form**: For form management.
- **zod**: For schema validation.
- **Vite**: For development and build.
- **TypeScript**: For type safety.
- **Tailwind CSS**: For styling.
- **ESBuild**: For production builds.
- **bcrypt**: For password hashing.
- **Forms.app**: For scholarship application forms.
- **Calendly**: For scheduling integration.
- **UChatWidget**: For WhatsApp communication.
- **Google Fonts**: For typography.