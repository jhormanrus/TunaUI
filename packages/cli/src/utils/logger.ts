import chalk from 'chalk'

export const logger = {
  error (...text: unknown[]) {
    console.log(chalk.red(...text))
  },
  warn (...text: unknown[]) {
    console.log(chalk.yellow(...text))
  },
  info (...text: unknown[]) {
    console.log(chalk.cyan(...text))
  },
  success (...text: unknown[]) {
    console.log(chalk.green(...text))
  }
}
