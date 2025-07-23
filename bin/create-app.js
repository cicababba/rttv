#!/usr/bin/env node
import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import path from 'path'

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

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
        const target = path.resolve(process.cwd(), projectName)
        console.log(`🚀 Creating project in ${target}…`)
        await fs.ensureDir(target)

        // 1) Genera package.json
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

        // 2) Copia template
        const templatesDir = path.resolve(__dirname, '../templates')
        await fs.copy(templatesDir, target)

        // 3) Installa dipendenze
        console.log('📦 Installing dependencies')
        await execa('npm', ['install'], { cwd: target, stdio: 'inherit' })

        console.log('✅ Done! Now execute this:')
        console.log(`   cd ${projectName}`)
        console.log('   npm run dev')
    })

program.parse()
