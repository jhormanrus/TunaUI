import * as p from '@clack/prompts'

export function handleError(error: unknown): void {
  if (typeof error === 'string') {
    p.cancel(error)
    process.exit(1)
  }

  if (error instanceof Error) {
    p.cancel(error.message)
    process.exit(1)
  }

  p.cancel('Something went wrong. Please try again.')
  process.exit(1)
}
