# School Website Application - Colégio OSE

## Overview

This is a modern, full-stack school website application built for "Colégio OSE" (OSE College). The application features a comprehensive school management system with separate client and server architectures, designed to showcase academic programs, faculty, news, testimonials, and handle contact inquiries. The website is built using React on the frontend and Express.js on the backend, with a PostgreSQL database for data storage.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system using school brand colors
- **UI Components**: Radix UI components with shadcn/ui design system
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Development**: Hot reloading with Vite middleware integration
- **API**: RESTful API design with structured error handling

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **In-Memory Storage**: Fallback MemStorage class for development/testing

## Key Components

### Database Schema
The application uses a comprehensive schema with the following entities:
- **Programs**: Academic programs with age ranges, features, and descriptions
- **Faculty**: Teacher profiles with contact information and descriptions
- **News**: School news articles with categories and publication dates
- **Testimonials**: User reviews with ratings and role information
- **Contacts**: Contact form submissions with inquiry tracking

### Frontend Components
- **Navigation**: Responsive navigation with smooth scrolling to sections
- **Hero Section**: Eye-catching landing area with call-to-action buttons
- **About Section**: School history and key values presentation
- **Programs Section**: Academic programs display with detailed information
- **Faculty Section**: Teacher profiles with contact information
- **News Section**: Latest school news and announcements
- **Testimonials**: Student and parent feedback with star ratings
- **Contact Form**: Inquiry submission with validation

### API Endpoints
- `GET /api/programs` - Retrieve all academic programs
- `GET /api/programs/:id` - Get specific program details
- `GET /api/faculty` - Get all faculty members
- `GET /api/faculty/:id` - Get specific faculty member
- `GET /api/news` - Retrieve all news articles
- `GET /api/news/:id` - Get specific news article
- `GET /api/testimonials` - Get all testimonials
- `POST /api/contacts` - Submit contact form

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express.js routes handle requests and interact with the database through Drizzle ORM
3. **Database Operations**: PostgreSQL stores and retrieves data with type-safe schema validation
4. **Response Handling**: Structured JSON responses with error handling and loading states
5. **UI Updates**: React components automatically update based on query state changes

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon Database
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **react-hook-form**: Performant forms with easy validation
- **zod**: TypeScript-first schema validation

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with npm package management
- **Development Server**: Vite dev server with Express.js backend
- **Hot Reloading**: Full-stack hot reloading with Vite middleware
- **Port Configuration**: Frontend and backend served on port 5000

### Production Deployment
- **Platform**: Replit with autoscale deployment target
- **Build Process**: 
  1. Vite builds optimized client-side bundle
  2. ESBuild bundles server code for Node.js
  3. Static assets served from Express.js
- **Database**: Persistent PostgreSQL connection to Neon Database
- **Environment**: Production-optimized with proper error handling

### Database Management
- **Migrations**: Drizzle Kit handles schema migrations
- **Connection**: Environment-based DATABASE_URL configuration
- **Seeding**: MemStorage class provides sample data for development

## Changelog

```
Changelog:
- June 23, 2025: Initial setup - Complete school website with homepage
- June 23, 2025: Added comprehensive services system with 12 different services
- June 23, 2025: Implemented Portal do Aluno with grades, assignments, schedule, and materials
- June 23, 2025: Created Portal dos Pais with child monitoring, communications, and financial tracking
- June 23, 2025: Enhanced navigation and footer with service connections
- June 23, 2025: Updated all content with authentic Colégio OSE data from 1924
- June 23, 2025: Integrated real contact information, programs, testimonials, and news
- June 23, 2025: Added authentic academic programs and school differentials
- June 23, 2025: Updated color scheme to official orange, brown, and white
- June 23, 2025: Integrated official OSE logo throughout all pages
- June 23, 2025: Implemented native tracking (Google Analytics, Facebook Pixel, GTM)
- June 23, 2025: Created migration guide for Hostgator WordPress replacement
- June 23, 2025: Built complete WordPress plugin replacement system (12 plugins)
- June 23, 2025: Implemented visual drag & drop page editor with component system
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```