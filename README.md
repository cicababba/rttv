# create‑rttv‑app

A simple CLI scaffold to boot up a Vite + React‑TypeScript project with TailwindCSS, sensible defaults and optional Git setup.

⚙️ This CLI uses [create-vite](https://www.npmjs.com/package/create-vite) internally to generate the base structure.


---

## Features

- 🔥 Generates a new Vite React‑TS with TailwindCSS ready to go project  
- 📝 Applies your `description`, `version`, `author`
- 📦 Installs base dependencies plus TailwindCSS plugins
- 🔧 Optional Git initialization, `.gitignore`
- 🪄 All steps wrapped in a friendly spinner & interactive prompts

---

## Prerequisites

- **Node.js** ≥ 16.x 

---

## Installation

You can install globally:

```bash
npm install -g rttv
```

---

## Usage

```bash
create‑rttv‑app <project-name> [options]
```

### Arguments

| Name             | Description                      |
| ---------------- | ------------------------------- |
| `<project-name>` | New folder & project name       |

### Options

| Short               | Long                     | Description                                    | Default |
| ------------------- | ------------------------ | ---------------------------------------------- | ------- |
| `-d, --description` | `--description <desc>`   | Project description in `package.json`          | `""`    |
| `-v, --version`     | `--version <ver>`        | Initial version in `package.json`              | `0.1.0` |
| `-a, --author`      | `--author <author>`      | Author name/email in `package.json`            | `""`    |

---

## What Happens Under the Hood

1. **Folder check & overwrite**  
   - If `<project-name>` already exists, you’ll be asked whether to empty it.

2. **`create-vite` scaffold**  
   ```bash
   npm create vite@latest <project-name> -- --template react-ts
   ```
   (stdout hidden; only errors are shown)

3. **`package.json` tweaks**  
   - Sets your `description`, `version`, `author`  
   - Forces `"type": "module"`

4. **Install dependencies**  
   ```bash
   cd <project-name>
   <pm> install
   ```
   followed by TailwindCSS plugins:
   ```bash
   <pm> install tailwindcss @tailwindcss/vite
   ```

5. **Custom config & entry files**  
   - Replaces `vite.config.ts` with the one in adding the `tailwindcss` plugin
   - Replaces default `src/*.css` & `src/*.tsx` with the needed to make TailwindCSS work

6. **Optional Git setup**  
   - Initialize `git init`  
   - Copy over a standard `.gitignore`

7. **Final instructions**  
   ```bash
   cd <project-name>
   <pm> run dev
   ```

---

## Generated project structure

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

---

## Examples

### Basic

#### After install

```bash
npx create‑rttv‑app awesome‑app
```

### With metadata

```bash
npx create‑rttv‑app my‑cool‑project   --description "A sweet new starter"   --version       "0.2.0"   --author        "Alice <alice@example.com>"
```

---

## License

MIT © [cicababba]