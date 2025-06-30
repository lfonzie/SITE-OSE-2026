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
- June 23, 2025: Imported authentic content from colegioose.com.br/legado/
- June 23, 2025: Configured real tracking IDs (GTM-524DC3R, Facebook Pixel 303393036895689)
- June 23, 2025: Applied all user corrections: removed logo text, background images, "a OSE" naming, 700 students stat, removed CTAs, updated navigation, Instagram grid with real photos
- June 23, 2025: Final adjustments: improved readability with shadows, corrected naming to "a OSE", removed LinkedIn/emails from teachers, updated testimonials background, removed news section, updated footer
- June 24, 2025: Bug fixes: Fixed analytics warnings, navigation issues, missing school colors, 404 page improvements, image asset handling
- June 24, 2025: Image system: Created comprehensive image handling system with @assets imports, optimized image component, gallery with modal viewer, responsive image examples
- June 25, 2025: Admin panel fixes: Fixed server startup errors, implemented proper image serving via API endpoints
- June 25, 2025: Instagram management: Created complete IG image management system with server-side file operations, admin panel loads directly from IG folder, real-time image upload/delete functionality
- June 25, 2025: Analytics fixes: Updated CSP to allow Google Analytics and Facebook Pixel scripts, disabled analytics in development mode to prevent blocking, configured authentic OSE tracking IDs
- June 25, 2025: WhatsApp widget management: Fixed duplicate widget issues, installed UChatWidget globally for production domain, custom development button with correct number (15) 2101-3812
- June 25, 2025: SEO implementation: Added comprehensive meta tags, Open Graph, Twitter Cards, structured data (JSON-LD), canonical URLs, and proper page titles for search engine optimization
- June 25, 2025: UChatWidget production fix: Updated CSP to allow all UChatWidget resources (sdk.dfktv2.com, ipapi.co, media-src), fixed deprecated mobile app meta tag, resolved widget loading issues on deployed site
- June 25, 2025: Auto-save system implementation: Created comprehensive auto-save hooks (useAutoSave, usePageData) for automatic saving of image changes, integrated Visual Composer with floating editor button on all education pages, restored grey gradient backgrounds to match site theme
- June 25, 2025: Enhanced image selection: Created EnhancedImageSelector with dual functionality - server image browser (all images from client/public/images) and upload capability, organized by directories with file size display, auto-save integration for seamless image management across all education pages
- June 25, 2025: Advanced image controls: Implemented ImagePositionControls with object-position, scale, opacity, filters, and object-fit adjustments; Created HeroBackgroundManager with gradient presets, custom colors, server/upload image backgrounds, overlay controls, and position settings; Integrated auto-save for all image positioning and background changes
- June 25, 2025: Unified image system: Integrated EnhancedImageSelector in admin panel for consistent image selection across all pages; Added precise positioning controls with horizontal/vertical sliders (-50% to +50%) for accurate image positioning within containers; Fixed TypeScript errors and completed container-based image positioning system
- June 25, 2025: Drag-and-drop image positioning: Created DragImagePosition component with intuitive mouse-based image repositioning; Replaced slider controls with direct click-and-drag interface for up/down and left/right image movement within containers; Integrated with auto-save system and visual feedback during dragging; Applied to all gallery images with authentication-based editing controls
- June 25, 2025: Site-wide image editing implementation: Applied drag-and-drop image positioning functionality across all education pages (Educação Infantil, Fundamental I & II, Ensino Médio, Programa Bilíngue, Programa Integral, Missão e Valores, Legacy OSE, Socioemocional); Unified image management system with consistent editing interface; Integrated authentication-based controls and auto-save functionality on every page
- June 25, 2025: Complete site-wide implementation: Extended drag-and-drop image editing to all pages and components including hero sections, program cards, social feeds, testimonials, and service pages (Amplia, Árvore, Code OSE, Isaac); Unified DragImagePosition component across entire application with consistent editing interface; Completed comprehensive image management system with authentication-based controls and auto-save functionality throughout the entire website
- June 26, 2025: Favicon implementation: Downloaded and integrated authentic OSE favicon files from colegioose.com.br (favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, safari-pinned-tab.svg); Created web app manifest for mobile device support; Applied proper cross-platform favicon configuration in HTML template with theme color matching OSE orange (#D97706)
- June 26, 2025: Content updates: Fixed Ensino Fundamental I program features to show "{CODE.OSE} Linguagem Programação" instead of "CODE OSE Programação"; Content reorganization: moved "Facilidade de Acesso" from "Por que escolher a OSE" to "Nossos Diferenciais" section, replaced {CODE.OSE} card with "Excelência Reconhecida" highlighting 98% family satisfaction rate
- June 26, 2025: Bug fix and enhancements: Fixed testimonials image selection bug #1243 by implementing PATCH API endpoint for testimonial updates; Added Pau Brasil parking logo to "Facilidade de Acesso" section in differentials; Added LinkedIn social media link in footer; Enhanced Educação Infantil page content with improved descriptions, methodology details, and 6 comprehensive educational features covering safety, AMPLIA collection, English introduction, socioemotional development, academic preparation, and creativity stimulation
- June 26, 2025: Comprehensive admin improvements: Added logout button on all admin pages after login; Fixed Infantil hero section to match Fund 1 layout without buttons; Implemented complete material list management system with drag-and-drop image repositioning; Created MaterialListManager for admin control of Google Drive links per grade/year; Added database schema for material lists with segment, grade, year, and Google Drive link fields; Enhanced Lista de Material page with image repositioning when logged in as admin; Confirmed "Por que estudar na OSE" and "Contato" sections already exist on Plural and Agenda Edu pages
- June 26, 2025: Educação Infantil content restructure: Completely redesigned content structure to match Fund 1/2/Médio format; Updated hero section with "Crescimento e exploração na primeira infância" tagline; Restructured features from 6 to 4 key differentials: Ambiente Seguro e Acolhedor, Pedagogia Finlandesa e Aprendizado Integral, Programa de Inglês com Introdução Natural, and Desenvolvimento Socioemocional como Prioridade; Reorganized content layout from 3-column to 2-column grid for better visual balance; Updated all descriptions with authentic content focusing on Jardim I and II for ages 4-6
- June 26, 2025: Complete admin system implementation: Added logout buttons throughout admin interface; Implemented comprehensive material list management system with drag-and-drop image repositioning capabilities; Created MaterialListManager component for Google Drive link administration per grade/year; Added full API routes for material list CRUD operations (GET, POST, PATCH, DELETE); Enhanced Lista de Material page with admin-controlled image positioning and link management; Added complete sections to AgendaEdu and Plurall pages including "Por que OSE" and "Contato" sections with proper styling and responsive design
- June 26, 2025: IEEE Spectrum Typography Implementation: Applied professional typography system from IEEE Spectrum across entire website; Implemented Merriweather serif font for all headlines and titles (h1-h6, .headline); Applied Source Sans Pro font for body text, navigation, and UI elements; Created comprehensive font hierarchy with proper weights and spacing; Enhanced typography with antialiasing and optimized letter spacing for improved readability; Integrated Google Fonts with fallback system for cross-platform compatibility
- June 26, 2025: Simple Auth Implementation: Replaced complex Replit OAuth with simple email/password authentication for admin access; Created simpleAuth.ts with session-based authentication using PostgreSQL; Implemented login form with clean interface using shadcn forms; Fixed 404 errors by moving auth routes outside /api/ pattern; Updated admin credentials to use secure password; Maintained session persistence and proper logout functionality
- June 26, 2025: Mobile-optimized social media buttons: Converted contact section social media links from text buttons to circular icon buttons; Enhanced mobile compatibility with responsive design; Added LinkedIn button with proper school page URL; Improved visual consistency with shadow effects and hover animations; Applied flex-wrap for better mobile layout
- June 26, 2025: Hero section standardization and Instagram management system: Standardized home page hero section to match education pages format with consistent gradient backgrounds and overlay settings; Implemented dedicated InstagramUploadManager component with drag-and-drop upload functionality; Created separate API endpoints for Instagram image management (/api/upload-instagram, /api/instagram-images/:filename); Reorganized admin panel with clean tabs for Instagram management, visual editor, and configurations; Fixed file organization to ensure Instagram images stay in /IG folder and other uploads go to /images folder for proper feed separation
- June 26, 2025: Legacy page fixes and content updates: Fixed Legacy page image editing functionality by removing problematic inline editor components and restoring drag-and-drop image positioning; Resolved TypeScript compilation errors that were preventing application startup; Updated Legacy page hero section content to "Um Século de Excelência" with "1924 - 2024: 100 Anos de Tradição Educacional" subtitle and authentic OSE centennial description highlighting the institution's fundamental role in regional education development
- June 29, 2025: Complete site-wide glassmorphism transformation: Applied comprehensive glassmorphism design effects across entire website including home page, all education pages (Legacy, Missão e Valores, Educação Infantil, Ensino Fundamental I & II, Ensino Médio), service pages (Programa Bilíngue, Integral, Amplia, Socioemocional), administrative pages (Lista de Material, Professores), and all final service pages (Árvore, Plurall, AgendaEdu, Isaac); Implemented translucent backgrounds with backdrop blur effects (backdrop-blur-lg), dynamic gradient animations with multiple animated orbs, enhanced visual depth with shadow effects, and responsive glassmorphism containers (bg-white/20-30) throughout all sections; Fixed TypeScript compilation errors in hero sections and contact forms; Created consistent modern aesthetic with floating animated background elements, border highlights (border-white/20), and cohesive translucent design patterns across 20+ pages for professional, contemporary visual experience with complete glassmorphism implementation
- June 29, 2025: Enhanced glassmorphism on educational pages: Applied glassmorphism effects to content cards and feature sections across Ensino Fundamental I, Fundamental II, and Ensino Médio pages; Updated all cards with translucent backgrounds (bg-white/30), backdrop blur effects (backdrop-blur-lg), and border highlights (border-white/20) for consistent visual depth; Fixed navigation positioning from sticky to fixed for better user experience across all pages; Completed comprehensive glassmorphism implementation on all educational content cards maintaining visual hierarchy and readability
- June 29, 2025: Dashboard glassmorphism implementation: Applied comprehensive glassmorphism effects to both React /dash page and static dashboard.html file; Updated /dash page with animated gradient background, floating orbs, and translucent cards (bg-white/30, backdrop-blur-lg); Enhanced dashboard.html with complete glassmorphism redesign including animated OSE-colored gradient background, floating animated orbs, translucent widgets, glassmorphism app cards, and modern backdrop blur effects throughout all UI elements; Both dashboard interfaces now feature consistent modern translucent aesthetic with OSE brand colors (orange/amber/brown gradients)
- June 29, 2025: Complete SEO and XML sitemap system implementation: Created comprehensive SEO optimization system with sitemap.xml containing all 18 website pages (educational programs, services, administrative pages) with proper priorities and change frequencies; Implemented robots.txt with crawl directives and sitemap location; Created dynamic SEO component with meta tags, Open Graph, Twitter Cards, structured data (JSON-LD), and canonical URLs; Added API endpoints (/sitemap.xml, /robots.txt) to serve SEO files with proper content types; Implemented SEO on all major educational pages: home page with EducationalOrganization structured data, Educação Infantil (ages 4-6), Ensino Fundamental I (ages 6-10), Ensino Fundamental II (ages 11-14), Ensino Médio (ages 15-17), Programa Bilíngue Global Citizens with Cambridge methodology, Programa Integral Flex with personalized support, and História da OSE Legacy page with centennial historical data and founder information; Each page includes specialized educational structured data, targeted keywords for Sorocaba market, comprehensive meta descriptions, and proper canonical URLs for optimal search engine optimization
- June 30, 2025: Calendly widget integration fix and dashboard.html enhancement: Fixed Calendly widget loading issues by updating Content Security Policy to allow all Calendly domains (assets.calendly.com, calendly.com, *.calendly.com, widget.calendly.com); Replaced dynamic script loading with direct iframe implementation for more reliable widget rendering; Updated dashboard.html with complete glassmorphism design matching site aesthetics, featuring animated gradient backgrounds, floating orbs, functional analog and digital clocks, weather widget, multi-engine search functionality (Google, YouTube, Wikipedia, Maps), comprehensive app grid with all school services, real-time statistics, news feed, and upcoming events calendar; Implemented responsive design with mobile optimization and interactive features including keyboard shortcuts and hover animations
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```