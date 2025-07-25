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
    console.log("👋 Welcome to create-rttv-app! You're about to create amazing things!")

    const target = path.resolve(process.cwd(), projectName)

    if (await fs.pathExists(target)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Folder "${projectName}" already exists. Overwrite?`,
          default: false
        }
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
      await execa('npm', [
        'create',
        'vite@latest',
        projectName,
        '--',
        '--template',
        'react-ts'
      ],{ stdio: ['ignore', 'ignore', 'inherit'] })
      spinner.succeed('Vite template created')
    } catch (error) {
      spinner.fail('Failed to run create-vite')
      process.exit(1)
    }

    spinner = ora('📝 Updating package.json').start()
    try {
      const pkgPath = path.join(target, 'package.json')
      const pkgJson = await fs.readJson(pkgPath)
      pkgJson.description = opts.description || ''
      pkgJson.version = opts.version || ''
      pkgJson.author = opts.author || ''
      pkgJson.type = 'module'

      await fs.writeJson(pkgPath, pkgJson, { spaces: 2 })
      spinner.succeed('package.json updated')
    } catch (e) {
      spinner.fail('Could not update package.json')
      process.exit(1)
    }

    spinner = ora('📦 Installing base dependencies').start()
    try {
      await execa('npm', ['install'], { cwd: target, stdio: ['ignore', 'ignore', 'inherit'] })
      spinner.succeed('Base dependencies installed')
    } catch (e) {
      spinner.fail('Failed to install base dependencies')
      process.exit(1)
    }

    spinner = ora('📦 Installing TailwindCSS dependencies').start()
    try {
      await execa('npm', ['install',
        'tailwindcss',
        '@tailwindcss/vite',
      ], { cwd: target, stdio: ['ignore', 'ignore', 'inherit'] })
      spinner.succeed('Tailwind deps installed')
    } catch (e) {
      spinner.fail('Failed to install Tailwind deps')
      process.exit(1)
    }

    spinner = ora('🧩 Updating vite.config.ts').start()
    const viteConfig = path.join(__dirname, '..', 'templates', 'conf', 'vite.config.ts')
    const srcViteConfig = path.join(target, 'vite.config.ts')
    try {
        await fs.remove(srcViteConfig) 
        await fs.copy(viteConfig, srcViteConfig)
        spinner.succeed('vite.config.ts updated')
    } catch (error) {
        spinner.fail('Failed to copy templates')
        process.exit(1)
    }

    spinner = ora('🎨 Updating main files').start()
    try {
      const indexCssPath = path.join(target, 'src', 'index.css')
      const appCssPath = path.join(target, 'src', 'App.css')
      const mainTsxPath = path.join(target, 'src', 'main.tsx')
      const appTsxPath = path.join(target, 'src', 'App.tsx')
      const indexHtmlPath = path.join(target, 'index.html')

      if(fs.existsSync(indexHtmlPath))
        await fs.remove(indexHtmlPath)
      spinner.succeed('index.html updated')

      const templatePath = path.join(__dirname, '..', 'templates', 'appFiles');
      await fs.copy(path.join(templatePath, 'index.html'), indexHtmlPath)

      if(fs.existsSync(indexCssPath))
        await fs.remove(indexCssPath)
      spinner.succeed('index.css updated')
      if(fs.existsSync(appCssPath))
        await fs.remove(appCssPath)
      spinner.succeed('App.css updated')
      if(fs.existsSync(mainTsxPath))
        await fs.remove(mainTsxPath)
      spinner.succeed('main.tsx updated')
      if(fs.existsSync(appTsxPath))
        await fs.remove(appTsxPath)
      spinner.succeed('App.tsx updated')

      const srcPath = path.join(target, 'src');
      
      await fs.copy(templatePath, srcPath);
      spinner.succeed('Main files updated')
    } catch (e) {
      spinner.fail('Failed to update main files')
      process.exit(1)
    }

    const { initializeGit } = await inquirer.prompt([gitInitPrompt])
    if (initializeGit) {
      spinner = ora('🔧 Initializing git repository').start()
      try {
        await execa('git', ['init'], { cwd: target })
        spinner.succeed('Git repo initialized')

        spinner = ora('📄 Adding .gitignore').start()
        const gitignoreSrc = path.resolve(__dirname, '../.gitignore')
        const gitignoreDest = path.join(target, '.gitignore')
        await fs.copyFile(gitignoreSrc, gitignoreDest)
        spinner.succeed('.gitignore added')

        const { addRemote } = await inquirer.prompt([addRemotePrompt])
        if (addRemote) {
          const { remoteUrl } = await inquirer.prompt([remoteUrlPrompt])
          spinner = ora(`🔗 Adding remote origin ${remoteUrl}`).start()
          await execa('git', ['remote', 'add', 'origin', remoteUrl], { cwd: target })
          spinner.succeed('Remote origin added')
        }
      } catch (e) {
        spinner.fail('Git setup failed')
      }
    }

    console.log('\n🎉 Done! Your app is now ready to rock! Just run:')
    console.log(`   cd ${projectName}`)
    console.log(`   ${'npm'} run dev`)
  })

program.parse()
