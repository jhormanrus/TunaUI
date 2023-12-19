import color from 'picocolors'

export const logger = {
  error(text: string) {
    console.log(color.red(text))
  },
  warn(text: string) {
    console.log(color.yellow(text))
  },
  info(text: string) {
    console.log(color.cyan(text))
  },
  success(text: string) {
    console.log(color.green(text))
  },
}
