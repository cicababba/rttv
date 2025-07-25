# create-rttv-app

**create-rttv-app** is a minimal CLI tool to scaffold a React + Vite + TypeScript + Tailwind CSS project in one command, now with interactive Git initialization and progress feedback.

## 🚀 Features

- Generates a `package.json` with React, ReactDOM, Vite, TypeScript, TailwindCSS, and related dependencies.
- Copies configuration files (TSConfig, Vite, Tailwind, PostCSS) and boilerplate assets (`index.html`, `src/`).
- Interactive Git setup: prompts to initialize a repository, add a `.gitignore`, and configure a remote.
- Visual progress spinners display status for each step (folder creation, templating, Git setup, and installation).
- Automatically installs dependencies after setup.
- Offers CLI options for project name, description, version, and author.

## 🔧 Prerequisites

- Node.js v16 or higher
- npm (Node Package Manager)
- Internet connection to download dependencies

## 📥 Installation

You can run the CLI without installing it globally via `npx`:

```bash
npx rttv <project-name> [options]
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

| Option                     | Description          | Default  |
| -------------------------- | -------------------- | -------- |
| `-d, --description <desc>` | Project description  | `''`     |
| `-v, --version <ver>`      | Initial version      | `0.1.0`  |
| `-a, --author <author>`    | Project author       | `''`     |


## 🛠️ CLI Development

To contribute or customize the CLI:

```bash
# Clone this repository
git clone <repo-url>
cd create-rttv-app
npm install

# Link locally for testing
npm link

# Edit templates in `templates/`
# Adjust `bin/create-app.js` to add or refine features
```

## 📜 License

This project is licensed under the MIT License © cicababba
