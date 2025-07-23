# create-rttv-app

**create-rttv-app** is a minimal CLI tool to scaffold a React + Vite + TypeScript + Tailwind CSS project in one command.

## 🚀 Features

* Generates a `package.json` with React, ReactDOM, Vite, TypeScript, TailwindCSS, and related dependencies.
* Copies configuration files (TSConfig, Vite, Tailwind, PostCSS) and boilerplate assets (`index.html`, `src/`).
* Automatically installs dependencies.
* Offers CLI options for project name, description, version, and author.

## 🔧 Prerequisites

* Node.js v16 or higher
* npm (Node Package Manager)
* Internet connection to download dependencies

## 📥 Installation

You can run the CLI without installing it globally via `npx`:

```bash
npx create-rttv-app <project-name> [options]
```

Or install it globally:

```bash
npm install -g create-rttv-app
# then run
create-rttv-app <project-name> [options]
```

## ⚙️ Usage

```bash
create-rttv-app <project-name> [options]
```

| Option                     | Description         | Default |
| -------------------------- | ------------------- | ------- |
| `-d, --description <desc>` | Project description | `''`    |
| `-v, --version <ver>`      | Initial version     | `0.1.0` |
| `-a, --author <author>`    | Project author      | `''`    |

### Example

```bash
npx create-rttv-app demo-app \
  --description "My awesome app" \
  --version 0.1.0 \
  --author "cicababba"
```

Expected output:

```
🚀 Creating project in /current/path/demo-app…
📦 Installing dependencies
✅ Done! Now execute this:
   cd demo-app
   npm run dev
```

Then start the development server:

```bash
cd demo-app
npm run dev
```

Open your browser at `http://localhost:5173` to see your React + Vite + TS + Tailwind application.

## 📂 Project Structure

```
<project-name>/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   └─ index.css
```

## 🛠️ CLI Development

To contribute or customize the CLI:

```bash
# Clone this repository
git clone <repo-url>
cd create-rtv-app
npm install

# Link locally for testing
npm link

# Edit templates in `templates/`
# Adjust `bin/create-app.js` to add features
```

## 📜 License

This project is licensed under the MIT License © Cicababba
