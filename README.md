This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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


## Project Overview

This project has 3 main pages:

1. / (page.tsx) – The main homepage.
2. /cart – Shopping cart page.
3. /product/[id] – Individual product detail page.

For better maintainability and reusability, we have created a custom design system. All reusable components can be found in the components folder. Each component is documented and has its own README for guidance.

## Scripts

Here are the main scripts defined in package.json:

```bash
npm run dev       # Run development server
npm run build     # Build the project for production
npm run start     # Start the production server
npm run lint      # Run ESLint
npm run test      # Run tests
```

## Testing

All tests are located in the __tests__ folder. You can run them using:

```bash
npm run test
```

## Project Structure

```
.
├── app/                  # Next.js pages and routing
├── components/           # Reusable UI components (Design System)
├── context/              # React context for global state (e.g., cart)
├── public/               # Static assets (images, icons)
├── styles/               # Global and modular CSS/SCSS
├── __tests__/            # Unit and integration tests
├── package.json
└── README.md
```


This structure ensures scalability, reusability, and easy maintenance.


