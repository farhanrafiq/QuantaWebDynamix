# QuantaFONS Corporate Website

## Overview

QuantaFONS is a cutting-edge R&D company specializing in civil engineering IT solutions, including PTFE-based concrete waterproofing, nano-enhanced admixtures, AI-driven structural health monitoring systems, and acoustic analytics platforms. This is a modern, enterprise-grade corporate website built as a full-stack application showcasing the company's technologies, products, and research capabilities through dynamic visualizations and interactive content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in a Vite-powered development environment
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Animations**: Framer Motion for page transitions and component animations, GSAP with ScrollTrigger for advanced scroll-based animations
- **3D Graphics**: Three.js for WebGL particle backgrounds and 3D visualizations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Theme Support**: next-themes for dark/light mode switching with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with `/api` prefix following Express routing patterns
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for runtime type validation and API request/response validation
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Neon serverless database
- **Schema Management**: Drizzle Kit for database migrations and schema versioning
- **Connection Pooling**: Neon serverless connection pooling for optimal performance
- **Data Models**: Comprehensive schema including users, contact messages, technologies, products, blog posts, team members, and job positions

### Authentication and Authorization
- **Session-based Authentication**: Express sessions for user state management
- **Role-based Access Control**: User roles defined in database schema (admin, editor, user)
- **Protected Routes**: Server-side route protection for admin functionality
- **Form Validation**: Client and server-side validation using Zod schemas

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL database with WebSocket support
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Database Migrations**: Automated schema management through Drizzle Kit

### UI and Animation Libraries
- **Radix UI**: Headless, accessible component primitives for complex UI components
- **Framer Motion**: Production-ready motion library for React animations
- **GSAP**: Professional-grade animation library with ScrollTrigger plugin
- **Three.js**: JavaScript 3D library for WebGL graphics and particle systems
- **Lottie React**: Render After Effects animations in React

### Development and Build Tools
- **Vite**: Fast build tool with hot module replacement and optimized production builds
- **TypeScript**: Static type checking with strict configuration
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Form Handling and Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Hookform Resolvers**: Zod integration for form validation
- **Zod**: TypeScript-first schema validation library

### Development Enhancement
- **React Query DevTools**: Development tools for debugging server state
- **Replit Integration**: Development environment integration with error overlays and cartographer