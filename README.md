# Simple Calculator

A modern, accessible calculator web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Memory Functions**: M+, M-, MR, MC
- **Advanced Operations**: Square root, power, percentage
- **History**: View and reuse previous calculations
- **Keyboard Support**: Full keyboard navigation and input
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG AA compliant with screen reader support
- **Theme Support**: Light and dark mode
- **Performance**: Optimized bundle size and fast loading

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel-ready

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Architecture

The calculator follows a clean architecture pattern with:

- **Components**: Reusable UI components with Shadcn UI
- **Logic**: Pure calculation functions in `/lib`
- **State**: React state management for calculator state
- **Types**: TypeScript interfaces for type safety
- **Tests**: Comprehensive test coverage

## Accessibility

- Full keyboard navigation
- Screen reader support with ARIA labels
- High contrast mode support
- Focus management
- WCAG AA compliance

## Performance

- Bundle size under 200KB
- First Contentful Paint under 1.5s
- Time to Interactive under 3s
- Optimized for mobile devices

## License

MIT
