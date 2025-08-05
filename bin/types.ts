// Type definitions for RTTV CLI

import type { ExecaChildProcess, Options as ExecaOptions } from 'execa'
// Remove unused inquirer imports that are causing issues

// ============================================================================
// CLI Command Types
// ============================================================================

export type CLIOptions = {
  description?: string
  version?: string
  author?: string
}

export type ProjectName = string

export type CLIAction = (projectName: ProjectName, options: CLIOptions) => Promise<void>

// ============================================================================
// Process Execution Types
// ============================================================================

export type ProcessCommand = string
export type ProcessArgs = string[]

export type ProcessOptions = {
  cwd?: string
  stdio?: ExecaOptions['stdio'] | undefined
}

export type ProcessResult = ExecaChildProcess<string>

export type NPMCommand = 'create' | 'install'
export type GitCommand = 'init'

// ============================================================================
// File System Types
// ============================================================================

export type FilePath = string
export type DirectoryPath = string

export type FileOperationResult = Promise<void>

export type PackageJsonData = {
  description?: string
  version?: string
  author?: string
  type?: 'module' | 'commonjs'
  [key: string]: unknown
}

export type TemplateFile = {
  source: FilePath
  destination: FilePath
}

export type TemplatePath = {
  base: DirectoryPath
  appFiles: DirectoryPath
  conf: DirectoryPath
}

// ============================================================================
// Inquirer Prompt Types
// ============================================================================

export type ConfirmPrompt = {
  type: 'confirm'
  name: string
  message: string
  default: boolean
}

export type InputPrompt = {
  type: 'input'
  name: string
  message: string
  validate?: (input: string) => boolean | string
}

export type OverwriteResponse = {
  overwrite: boolean
}

export type GitInitResponse = {
  initializeGit: boolean
}

export type AddRemoteResponse = {
  addRemote: boolean
}

export type RemoteUrlResponse = {
  remoteUrl: string
}

// ============================================================================
// Error Handling Types
// ============================================================================

export type CLIError = {
  message: string
  code?: string | number
  cause?: unknown
}

export type OperationResult<T = void> = {
  success: boolean
  data?: T
  error?: CLIError
}

export type SpinnerState = 'start' | 'succeed' | 'fail'

export type SpinnerMessage = {
  start: string
  succeed?: string
  fail?: string
}

// ============================================================================
// Template Operations Types
// ============================================================================

export type ViteTemplate = 'react-ts'

export type TailwindDependencies = 'tailwindcss' | '@tailwindcss/vite'

export type MainFiles = {
  indexCss: FilePath
  appCss: FilePath
  mainTsx: FilePath
  appTsx: FilePath
  indexHtml: FilePath
}

export type AssetFiles = {
  reactSvg: FilePath
}

// ============================================================================
// Validation Types
// ============================================================================

export type URLValidator = (input: string) => boolean | string

export type ProjectNameValidator = (name: string) => boolean

// ============================================================================
// Utility Types
// ============================================================================

export type Awaitable<T> = T | Promise<T>

export type NonEmptyString = string & { readonly brand: unique symbol }

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// ============================================================================
// Module Path Types
// ============================================================================

export type ModulePaths = {
  __filename: FilePath
  __dirname: DirectoryPath
  templatesDir: DirectoryPath
  appFilesDir: DirectoryPath
  confDir: DirectoryPath
}

// Type guards for runtime validation
export function isNonEmptyString(value: string): value is NonEmptyString {
  return value.trim().length > 0
}

export function isValidUrl(input: string): boolean {
  return input.startsWith('http')
}