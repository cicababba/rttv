const getPkg = (projectName, opts) => {
    return {
        name: projectName,
        version: opts.version,
        description: opts.description,
        author: opts.author,
        private: true,
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'tsc -b && vite build',
            lint: "eslint .",
            preview: 'vite preview',
        },
        dependencies: {
            "@tailwindcss/vite": "^4.1.11",
            "react": "^19.1.0",
            "react-dom": "^19.1.0",
            "tailwindcss": "^4.1.11"
        },
        devDependencies: {
            "@eslint/js": "^9.30.1",
            "@types/react": "^19.1.8",
            "@types/react-dom": "^19.1.6",
            "@vitejs/plugin-react": "^4.6.0",
            "eslint": "^9.30.1",
            "eslint-plugin-react-hooks": "^5.2.0",
            "eslint-plugin-react-refresh": "^0.4.20",
            "globals": "^16.3.0",
            "typescript": "~5.8.3",
            "typescript-eslint": "^8.35.1",
            "vite": "^7.0.4"
        },
    }
}

const gitInitPrompt = {
    type: 'confirm',
    name: 'initializeGit',
    message: 'Do you want to initialize a Git repository?',
    default: false,
}

const addRemotePrompt = {
    type: 'confirm',
    name: 'addRemote',
    message: 'Do you want to add a Git remote (e.g. GitHub)?',
    default: false,
}

const remoteUrlPrompt = {
    type: 'input',
    name: 'remoteUrl',
    message: 'Enter the remote repository URL:',
    validate: (input) => input.startsWith('http') || 'Please enter a valid URL',
}

export { getPkg, gitInitPrompt, addRemotePrompt, remoteUrlPrompt }
