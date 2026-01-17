# Devzi - Master Guide

**Version**: 2.0.0
**Status**: Active Development
**Last Updated**: 2026-01-14

## Project Overview

Devzi is a high-end digital agency platform productized to offer streamlined web development services. It features a "Service Store" for packaged offers, a "Client Portal" for project tracking, and an "AI Architect" for automated project scoping.

## Tech Stack

-   **Framework**: React 19 + Vite
-   **Routing**: React Router DOM v7
-   **Authentication**: Supabase Auth (Google OAuth)
-   **Database**: Supabase (PostgreSQL)
-   **AI**: Google Gemini 2.5 Flash
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Icons**: Lucide React

## Core Features (V2 & V2.1)

### 1. Service Store (`/pricing`)
-   **Concept**: Productized services presented in Bento-style cards.
-   **Pricing**: Toggle for "One-time" vs "Monthly" billing.
-   **Packs**:
    -   *The Landing*: high-conversion landing pages.
    -   *The SaaS Starter*: MVP toolkit.
    -   *The Scaler*: Growth & optimization.

### 2. Client Portal (`/dashboard`)
-   **Concept**: A "Cockpit" for clients to track their build.
-   **Structure**: 3-Column Layout.
    -   *Left*: Assets & Nav (Links to Figma/GitHub/Stripe).
    -   *Center*: Live Progress Timeline (Powered by Supabase).
    -   *Right*: Communication & Preview.

### 3. AI Architect Flow (`/architect`)
-   **Concept**: An immersive "Terminal" interface to scope custom projects.
-   **Flow**:
    1.  User enters vision.
    2.  Gemini AI analyzes and suggests stack/features.
    3.  Generates a "Blueprint" (Tech stack, time estimate, price).

### 4. Authentication (`/login`)
-   **Concept**: Dedicated secure login page.
-   **Features**:
    -   Google Sign-In.
    -   Protected Routes (Dashboard).
    -   Session persistence.

## Project Structure

```
/src
  /components
    /Navbar.tsx      # Main navigation
    /BentoCard.tsx   # Shared card component with hover effects
    /DevziLogo.tsx   # Animated SVG Logo
  /context
    /AuthContext.tsx # Authentication State Management
  /lib
    /supabase.ts     # Supabase Client Configuration
  /pages
    /Home.tsx        # Landing Page
    /Services.tsx    # Services Overview
    /Pricing.tsx     # Service Store Implementation
    /Dashboard.tsx   # Client Portal (Real Data)
    /Architect.tsx   # AI Scoping Flow (Gemini)
    /Login.tsx       # Dedicated Login Page
    /Contact.tsx     # Contact Form
  App.tsx            # Main Routing
```

## Environment Variables

Configuration is managed via `.env` files.

**Required Keys**:
-   `VITE_SUPABASE_URL`: Connection URL for Supabase.
-   `VITE_SUPABASE_ANON_KEY`: Public API key for Supabase.
-   `VITE_GEMINI_API_KEY`: API Key for Google Generative AI.
-   `VITE_STRIPE_PUBLISHABLE_KEY`: Public key for Stripe elements.

**Setup**:
1.  Copy `.env` to `.env.local`.
2.  Fill in your keys.

*Note: `.env.local` is git-ignored for security.*

## Design System

-   **Colors**:
    -   Black: `#000000` / `#0A0A0A`
    -   Blue: `#3B82F6` (Electric Blue)
    -   Orange: `#F97316` (Accent)
-   **Typography**: Inter / Mono (for terminal elements).
-   **UI Patterns**:
    -   *Bento Grids*: Rounded corners (xl-3xl), dark backgrounds, border highlighting.
    -   *Glassmorphism*: `backdrop-blur-md`, `bg-white/5`.
