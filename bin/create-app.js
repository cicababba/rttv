#!/usr/bin/env node
import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import {
    getPkg,
    gitInitPrompt,
    addRemotePrompt,
    remoteUrlPrompt,
} from './pkg.js'

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

        if (await fs.pathExists(target)) {
            console.error(
                `❌ Folder "${projectName}" already exists. Choose a different name or remove it first.`
            )
            process.exit(1)
        }

        let spinner = ora(`🚀 Creating project folder at ${target}`).start()
        try {
            await fs.ensureDir(target)
            spinner.succeed('Project folder created')
        } catch (error) {
            spinner.fail('❌ Failed to create project folder')
            process.exit(1)
        }

        spinner = ora('✨ Generating package.json').start()

        const pkg = getPkg(projectName, opts)

        try {
            await fs.writeJson(path.join(target, 'package.json'), pkg, {
                spaces: 2,
            })
            spinner.succeed('package.json generated')
        } catch (error) {
            spinner.fail('❌ Failed to write package.json')
            process.exit(1)
        }

        spinner = ora('📂 Copying template files').start()
        const templatesDir = path.resolve(__dirname, '../templates')
        try {
            await fs.copy(templatesDir, target)
            spinner.succeed(' Templates copied')
        } catch (error) {
            spinner.fail('❌ Failed to copy templates')
            process.exit(1)
        }

        const { initializeGit } = await inquirer.prompt([gitInitPrompt])

        if (initializeGit) {
            spinner = ora('🔧 Initializing git repository').start()
            try {
                await execa('git', ['init'], { cwd: target })
                spinner.succeed(' Git repository initialized')

                spinner = ora('📄 Adding .gitignore').start()
                const gitignoreSrc = path.resolve(__dirname, '../.gitignore')
                const gitignoreDest = path.join(target, '.gitignore')
                await fs.copyFile(gitignoreSrc, gitignoreDest)
                spinner.succeed('.gitignore added')

                const { addRemote } = await inquirer.prompt([addRemotePrompt])

                if (addRemote) {
                    const { remoteUrl } = await inquirer.prompt([
                        remoteUrlPrompt,
                    ])

                    spinner = ora(
                        `🔗 Adding remote origin ${remoteUrl}`
                    ).start()

                    await execa('git', ['remote', 'add', 'origin', remoteUrl], {
                        cwd: target,
                    })
                    spinner.succeed('Remote origin added')
                }
            } catch (error) {
                spinner.fail('❌ Git initialization failed')
            }
        }

        spinner = ora(
            '📦 Installing dependencies (this may take a while)'
        ).start()
        try {
            await execa('npm', ['install'], { cwd: target })
            spinner.succeed('✅ Dependencies installed')
        } catch (error) {
            spinner.fail('❌ Dependency installation failed')
            process.exit(1)
        }

        console.log('\n🎉 Done! Now run:')
        console.log(`   cd ${projectName}`)
        console.log('   npm run dev')
    })

program.parse()
