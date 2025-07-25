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

export { gitInitPrompt, addRemotePrompt, remoteUrlPrompt }
