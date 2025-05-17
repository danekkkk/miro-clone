# Miro Clone - Interactive Whiteboard Application

> A full-featured collaborative whiteboard application built with Next.js and Liveblocks, allowing real-time collaboration on virtual canvases.

## 📋 Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)

## 🔭 Overview

This Miro clone is a powerful collaborative whiteboard application that enables teams to work together in real-time. Create, edit, and share interactive boards with multiple users simultaneously. Perfect for brainstorming, planning, designing, and collaborating remotely.

## 🎮 Demo 
[Miro Clone Demo](https://miro-clone-kcn9zbcap-daneks-projects-368e2b89.vercel.app/)

## ✨ Features

### Real-time Collaboration
- Multi-user editing with live cursor tracking
- See who's online with user presence indicators
- Real-time updates across all connected clients

### Rich Canvas Functionality
- Create and manipulate various shapes (rectangles, ellipses)
- Add and edit text elements
- Create sticky notes
- Free-form drawing with pencil tool
- Selection and multi-selection of elements
- Resize, move, and delete elements

### User Interface
- Intuitive toolbar for easy access to all tools
- Selection tools with contextual options
- Undo/redo functionality with history tracking
- Camera controls for panning around the canvas

### Organization
- Dashboard for managing boards
- Favorites system for quick access to important boards
- Search functionality to find specific boards
- Organization and user management

### Authentication & Authorization
- Secure user authentication with Clerk
- Organization-based permissions
- Invite system for adding team members

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - UI component library

### Backend & Data
- **[Liveblocks](https://liveblocks.io/)** - Real-time collaboration infrastructure
- **[Convex](https://www.convex.dev/)** - Backend database and API
- **[Clerk](https://clerk.com/)** - Authentication and user management

### Additional Libraries
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[perfect-freehand](https://github.com/steveruizok/perfect-freehand)** - Smooth drawing algorithm
- **[Zustand](https://github.com/pmndrs/zustand)** - State management
- **[nanoid](https://github.com/ai/nanoid)** - ID generation
- **[Stripe](https://stripe.com/)** - Payment processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun
- Liveblocks account
- Convex account
- Clerk account

### Installation

1. Clone the repository
```bash
git clone https://github.com/danekkkk/miro-clone.git
cd miro-clone
```

2. Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY=
NEXT_PUBLIC_LIVEBLOCKS_SECRET_API_KEY=

STRIPE_API_KEY=
STRIPE_WEBHOOK_URL=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
miro-clone/
├── app/                  # Next.js App Router
│   ├── (dashboard)/      # Dashboard pages
│   ├── api/              # API routes
│   ├── board/            # Board pages and components
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── auth/             # Authentication components
│   └── ui/               # UI components
├── convex/               # Convex backend
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # React context providers
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 📦 Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com/), the creators of Next.js:

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Configure the environment variables
4. Deploy


Built with ❤️ by [Dominik Stwora | @danekkkk](https://github.com/danekkkk/)
