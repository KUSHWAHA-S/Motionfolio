# Motionfolio

A modern, animated portfolio builder built with Next.js. Create beautiful, customizable portfolios with live editing, multiple templates, and seamless publishing.

## Features

- 🎨 **Multiple Templates** - Choose from Modern Creative, Minimal Showcase, or Developer Two-Column templates
- ✏️ **Live Editor** - Real-time preview with auto-save functionality
- 🎭 **Rich Sections** - Hero, About, Projects, Experience, Skills sections
- 🎨 **Theme Customization** - Preset themes or custom color picker
- 🔐 **Authentication** - Secure user authentication with Supabase
- 📱 **Responsive Design** - Works beautifully on all devices
- ⚡ **Fast & Modern** - Built with Next.js 16, React 19, and TypeScript

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Framer Motion, GSAP
- **State Management**: Zustand
- **Database & Auth**: Supabase
- **UI Components**: Radix UI
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd motionfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
└── styles/          # Global styles
```

For detailed project analysis, see [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy!

## License

This project is private and proprietary.
