# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RTTV is a CLI scaffolding tool (`create-rttv-app`) that generates React + Vite + TypeScript + TailwindCSS starter projects. It's built as an npm package with a binary executable.

## Architecture

### Core Components
- `bin/create-app.js` - Main CLI entry point using Commander.js for argument parsing
- `bin/pkg.js` - Contains inquirer prompt definitions for git initialization
- `templates/` - Template files copied to generated projects
  - `templates/appFiles/` - React app source files (App.tsx, main.tsx, CSS files)
  - `templates/conf/` - Configuration files (vite.config.ts, README.md)

### CLI Workflow
The CLI follows this sequence:
1. Validates/creates target directory
2. Runs `npm create vite@latest <name> -- --template react-ts`
3. Updates package.json with user metadata
4. Installs base dependencies + TailwindCSS
5. Replaces Vite config and app files with custom templates
6. Optionally initializes Git repository
7. Adds custom README

### Key Dependencies
- `commander` - CLI argument parsing
- `execa` - Process execution for npm/git commands
- `fs-extra` - Enhanced file system operations
- `inquirer` - Interactive prompts
- `ora` - Progress spinners

## Development Commands

This is a pure Node.js CLI tool with no build step. The main executable is `bin/create-app.js`.

### Testing the CLI locally:
```bash
# Link for local testing
npm link

# Test the CLI
create-rttv-app test-project

# Unlink when done
npm unlink -g
```

### Publishing:
```bash
npm publish
```

## File Structure

```
bin/
├── create-app.js    # Main CLI executable
└── pkg.js          # Inquirer prompt definitions

templates/
├── appFiles/       # React app source template files
└── conf/          # Configuration template files
```

The package.json `bin` field points to `bin/create-app.js` as the executable for `create-rttv-app`.