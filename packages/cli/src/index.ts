#!/usr/bin/env node
import { add } from '@/commands/add'
// import { diff } from '@/commands/diff'
import { init } from '@/commands/init'
import { Command } from 'commander'
import packageJson from '../package.json'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main (): Promise<void> {
  const program = new Command()
    .name('tuna-ui')
    .description('add components and dependencies to your project')
    .version(
      packageJson.version,
      '-v, --version',
      'display the version number'
    )

  program
    .addCommand(init)
    .addCommand(add)
    // .addCommand(diff)

  program.parse()
}

await main()
