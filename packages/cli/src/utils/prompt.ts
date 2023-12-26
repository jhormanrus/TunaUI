import { existsSync } from 'fs'
import * as p from '@clack/prompts'
import color from 'picocolors'

export function printIntro(): void {
  p.intro(`${color.bgCyan(color.bold(color.black(' TunaUI ')))}`)
}

export function onCancel(): void {
  p.cancel('Operation cancelled.')
  process.exit(0)
}

export function validateCwd(cwd: string): void {
  if (!existsSync(cwd)) {
    p.cancel(`The path ${cwd} does not exist. Please try again.`)
    process.exit(1)
  }
}
