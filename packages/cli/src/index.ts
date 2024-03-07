#!/usr/bin/env bun
import { add } from '@/commands/add'
import { diff } from '@/commands/diff'
import { init } from '@/commands/init'
import { Command } from 'commander'
import packageJson from '../package.json'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

function main() {
  const program = new Command()
    .name('lidia')
    .description('add components and dependencies to your project')
    .version(packageJson.version, '-v, --version', 'display the version number')

  program.addCommand(init).addCommand(add).addCommand(diff)

  program.parse()
}

main()
