import { existsSync } from 'node:fs'
import { styleText } from 'node:util'
import * as p from '@clack/prompts'

export function printIntro(): void {
  p.intro(`${styleText('bgMagenta', styleText('bold', ' Lidia UI '))}`)
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
