import type { ConfirmPrompt, InputPrompt } from './types.js'

const gitInitPrompt: ConfirmPrompt = {
    type: 'confirm',
    name: 'initializeGit',
    message: 'Do you want to initialize a Git repository?',
    default: false,
}

const addRemotePrompt: ConfirmPrompt = {
    type: 'confirm',
    name: 'addRemote',
    message: 'Do you want to add a Git remote (e.g. GitHub)?',
    default: false,
}

const remoteUrlPrompt: InputPrompt = {
    type: 'input',
    name: 'remoteUrl',
    message: 'Enter the remote repository URL:',
    validate: (input) => input.startsWith('http') || 'Please enter a valid URL',
}

export { gitInitPrompt, addRemotePrompt, remoteUrlPrompt }