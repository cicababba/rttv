# My Vite‑React‑TS App

A fast, opinionated starter for a Vite + React + TypeScript project with TailwindCSS, ESLint and a sensible folder structure.

## Features

- ⚡ **Vite** for instant dev server and lightning‑fast builds  
- 🖥️ **React** + **TypeScript** ready to go  
- 🎨 **Tailwind CSS** pre‑configured  
- 🔍 **ESLint** setup (via `eslint.config.js`)  
- 📁 Classic folder structure (public, src, assets, etc.)  

## Prerequisites

- **Node.js** 16.x or higher

## Installation

```bash
# 1. Just run it, easy as that
npm run dev
```

## Development

Start the development server with hot‑reload:

```bash
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Building for Production

```bash
npm run build
```

This generates the optimized `dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

## Project Structure

```
.
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── index.html
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

- **public/**: static files (favicon, SVGs, etc.)  
- **src/assets/**: images and other assets  
- **src/index.html**: HTML entry point  
- **src/main.tsx**: React bootstrap  
- **src/App.tsx**, **App.css**: main component  
- **src/index.css**: Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`)  
- **vite.config.ts**: custom Vite config with Tailwind plugin  
- **eslint.config.js**: linting rules  

## Linting

Check your code with ESLint:

```bash
npm run lint
```

*(Add this script to `package.json` if missing:)*

```json
"scripts": {
  "lint": "eslint "src/**/*.{ts,tsx,js,jsx}" --fix"
}
```

## Customization

- **Tailwind**: adjust classes in `index.css` or create a `tailwind.config.js` for custom settings.  
- **Vite**: add plugins and aliases in `vite.config.ts`.  
- **TypeScript**: modify compiler options in `tsconfig.json` and `tsconfig.app.json`.

---

## License

Created with [create-rttv-app](https://www.npmjs.com/package/rttv)
