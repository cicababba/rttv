#!/usr/bin/env node
import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { gitInitPrompt, addRemotePrompt, remoteUrlPrompt } from './pkg.js'
import type { Options as ExecaOptions } from 'execa'
import type {
    CLIOptions,
    ProjectName,
    FilePath,
    DirectoryPath,
    PackageJsonData,
    OverwriteResponse,
    GitInitResponse,
    MainFiles,
    ModulePaths,
    ViteTemplate,
    TailwindDependencies,
    ProcessArgs
} from './types.js'

const __filename: FilePath = fileURLToPath(import.meta.url)
const __dirname: DirectoryPath = dirname(__filename)

const program = new Command()

program
    .name('create-rttv-app')
    .argument('<project-name>', 'Project name')
    .option('-d, --description <desc>', 'Description', '')
    .option('-v, --version <ver>', 'Initial version', '0.1.0')
    .option('-a, --author <author>', 'Author', '')
    .action(async (projectName: ProjectName, opts: CLIOptions): Promise<void> => {
        console.log(
            "👋 Welcome to create-rttv-app! You're about to create amazing things!"
        )

        const target: DirectoryPath = path.resolve(process.cwd(), projectName)

        if (await fs.pathExists(target)) {
            const { overwrite }: OverwriteResponse = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Folder "${projectName}" already exists. Overwrite?`,
                    default: false,
                },
            ])
            if (!overwrite) {
                console.error('❌ Aborting.')
                process.exit(1)
            }
            const spinnerRm = ora(`🗑 Emptying "${projectName}"`).start()
            await fs.emptyDir(target)
            spinnerRm.succeed('Folder emptied')
        }

        let spinner = ora(`🚀 Running create-vite (react-ts)`).start()
        try {
            const viteTemplate: ViteTemplate = 'react-ts'
            const createViteArgs: ProcessArgs = [
                'create',
                'vite@latest',
                projectName,
                '--',
                '--template',
                viteTemplate,
            ]
            const execaOptions: ExecaOptions = { stdio: ['ignore', 'ignore', 'inherit'] }
            
            await execa('npm', createViteArgs, execaOptions)
            spinner.succeed('Vite template created')
        } catch (error: unknown) {
            spinner.fail('Failed to run create-vite')
            process.exit(1)
        }

        spinner = ora('📝 Updating package.json').start()
        try {
            const pkgPath: FilePath = path.join(target, 'package.json')
            const pkgJson: PackageJsonData = await fs.readJson(pkgPath)
            pkgJson.description = opts.description || ''
            pkgJson.version = opts.version || ''
            pkgJson.author = opts.author || ''
            pkgJson.type = 'module'

            await fs.writeJson(pkgPath, pkgJson, { spaces: 2 })
            spinner.succeed('package.json updated')
        } catch (e: unknown) {
            spinner.fail('Could not update package.json')
            process.exit(1)
        }

        spinner = ora('📦 Installing base dependencies').start()
        try {
            const installOptions: ExecaOptions = {
                cwd: target,
                stdio: ['ignore', 'ignore', 'inherit'],
            }
            await execa('npm', ['install'], installOptions)
            spinner.succeed('Base dependencies installed')
        } catch (e: unknown) {
            spinner.fail('Failed to install base dependencies')
            process.exit(1)
        }

        spinner = ora('📦 Installing TailwindCSS dependencies').start()
        try {
            const tailwindDeps: TailwindDependencies[] = ['tailwindcss', '@tailwindcss/vite']
            const installTailwindArgs: ProcessArgs = ['install', ...tailwindDeps]
            const tailwindOptions: ExecaOptions = { 
                cwd: target, 
                stdio: ['ignore', 'ignore', 'inherit'] 
            }
            
            await execa('npm', installTailwindArgs, tailwindOptions)
            spinner.succeed('Tailwind deps installed')
        } catch (e: unknown) {
            spinner.fail('Failed to install Tailwind deps')
            process.exit(1)
        }

        spinner = ora('🧩 Updating vite.config.ts').start()
        const viteConfig: FilePath = path.join(
            __dirname,
            '..',
            'templates',
            'conf',
            'vite.config.ts'
        )
        const srcViteConfig: FilePath = path.join(target, 'vite.config.ts')
        try {
            await fs.remove(srcViteConfig)
            await fs.copy(viteConfig, srcViteConfig)
            spinner.succeed('vite.config.ts updated')
        } catch (error: unknown) {
            spinner.fail('Failed to copy templates')
            process.exit(1)
        }

        spinner = ora('🎨 Updating main files').start()
        try {
            const mainFiles: MainFiles = {
                indexCss: path.join(target, 'src', 'index.css'),
                appCss: path.join(target, 'src', 'App.css'),
                mainTsx: path.join(target, 'src', 'main.tsx'),
                appTsx: path.join(target, 'src', 'App.tsx'),
                indexHtml: path.join(target, 'index.html'),
            }

            if (fs.existsSync(mainFiles.indexHtml)) await fs.remove(mainFiles.indexHtml)
            spinner.succeed('index.html updated')

            const templatePath: DirectoryPath = path.join(
                __dirname,
                '..',
                'templates',
                'appFiles'
            )
            await fs.copy(path.join(templatePath, 'index.html'), mainFiles.indexHtml)

            if (fs.existsSync(mainFiles.indexCss)) await fs.remove(mainFiles.indexCss)
            spinner.succeed('index.css updated')
            if (fs.existsSync(mainFiles.appCss)) await fs.remove(mainFiles.appCss)
            spinner.succeed('App.css updated')
            if (fs.existsSync(mainFiles.mainTsx)) await fs.remove(mainFiles.mainTsx)
            spinner.succeed('main.tsx updated')
            if (fs.existsSync(mainFiles.appTsx)) await fs.remove(mainFiles.appTsx)
            spinner.succeed('App.tsx updated')

            const srcPath: DirectoryPath = path.join(target, 'src')

            const reactSvgPath: FilePath = path.join(srcPath, 'assets', 'react.svg')
            if (fs.existsSync(reactSvgPath)) await fs.remove(reactSvgPath)
            spinner.succeed('Removed useless staff')

            await fs.copy(templatePath, srcPath)
            spinner.succeed('Main files updated')
        } catch (e: unknown) {
            spinner.fail('Failed to update main files')
            process.exit(1)
        }

        const gitResponse = await inquirer.prompt([gitInitPrompt])
        const { initializeGit }: GitInitResponse = gitResponse as GitInitResponse
        if (initializeGit) {
            spinner = ora('🔧 Initializing git repository').start()
            try {
                const gitOptions: ExecaOptions = { cwd: target }
                await execa('git', ['init'], gitOptions)
                spinner.succeed('Git repo initialized')

                spinner = ora('📄 Adding .gitignore').start()
                const gitignoreSrc: FilePath = path.resolve(__dirname, '../.gitignore')
                const gitignoreDest: FilePath = path.join(target, '.gitignore')
                await fs.copyFile(gitignoreSrc, gitignoreDest)
                spinner.succeed('.gitignore added')
            } catch (e: unknown) {
                spinner.fail('Git setup failed')
            }
        }

        spinner = ora('🧩 Adding README.md').start()
        const readmePath: FilePath = path.join(
            __dirname,
            '..',
            'templates',
            'conf',
            'README.md'
        )
        const srcReadme: FilePath = path.join(target, 'README.md')
        try {
            await fs.remove(srcReadme)
            await fs.copy(readmePath, srcReadme)
            spinner.succeed('README.md added')
        } catch (error: unknown) {
            spinner.fail('Failed to copy templates')
            process.exit(1)
        }

        console.log('\n🎉 Done! Your app is now ready to rock! Just run:')
        console.log(`   cd ${projectName}`)
        console.log(`   ${'npm'} run dev`)
    })

program.parse()