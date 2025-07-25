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
            preview: 'vite preview',
        },
        dependencies: {
            react: '^19.1.0',
            'react-dom': '^19.1.0',
        },
        devDependencies: {
            vite: '^7.0.4',
            typescript: '^5.8.3',
            tailwindcss: '^4.1.11',
            postcss: '^8.5.6',
            '@tailwindcss/postcss': '^4.1.11',
            autoprefixer: '^10.4.21',
            '@vitejs/plugin-react': '^4.6.0',
            '@types/react': '^19.1.8',
            '@types/react-dom': '^19.1.6',
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
