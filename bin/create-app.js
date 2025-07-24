#!/usr/bin/env node
import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import path from 'path'
import inquirer from 'inquirer'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

program
    .name('create-rttv-app')
    .argument('<project-name>', 'Project name')
    .option('-d, --description <desc>', 'Description', '')
    .option('-v, --version <ver>', 'Initial version', '0.1.0')
    .option('-a, --author <author>', 'Author', '')
    .action(async (projectName, opts) => {
        console.log(
            "👋 Welcome to create-rttv-app! You're about to create amazing things!"
        )
        const target = path.resolve(process.cwd(), projectName)
        console.log(`🚀 Creating project in ${target}`)
        await fs.ensureDir(target)

        const pkg = {
            name: projectName,
            version: opts.version,
            description: opts.description,
            author: opts.author,
            private: true,
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
        await fs.writeJson(path.join(target, 'package.json'), pkg, {
            spaces: 2,
        })

        const templatesDir = path.resolve(__dirname, '../templates')
        await fs.copy(templatesDir, target)
        console.log('📂 Project files copied!')

        const { initializeGit } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'initializeGit',
                message: 'Do you want to initialize a Git repository?',
                default: false,
            },
        ])

        if (initializeGit) {
            console.log('🔧 Initializing git repository…')
            await execa('git', ['init'], { cwd: target })
            const gitignoreSrc = path.resolve(__dirname, '../.gitignore')
            const gitignoreDest = path.join(target, '.gitignore')
            await fs.copyFile(gitignoreSrc, gitignoreDest)

            const { addRemote } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'addRemote',
                    message: 'Do you want to add a Git remote (e.g. GitHub)?',
                    default: false,
                },
            ])

            if (addRemote) {
                const { remoteUrl } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'remoteUrl',
                        message: 'Enter the remote repository URL:',
                        validate: (input) =>
                            input.startsWith('http') ||
                            'Please enter a valid URL',
                    },
                ])

                console.log(`🔗 Adding remote origin ${remoteUrl}…`)
                await execa('git', ['remote', 'add', 'origin', remoteUrl], {
                    cwd: target,
                })
            }
            console.log('✅ Git repository initialized!')
        }

        console.log('📦 Installing dependencies')
        await execa('npm', ['install'], { cwd: target, stdio: 'inherit' })

        console.log('✅ Done! Now execute this:')
        console.log(`   cd ${projectName}`)
        console.log('   npm run dev')
    })

program.parse()
