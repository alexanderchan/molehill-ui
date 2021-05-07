import { Command } from 'commander'
import 'regenerator-runtime/runtime'
import { init } from './init'

const program = new Command()

program
  .version('1.0.0')
  .option('-p --path <path>', 'path', process.cwd())
  .description('initializes configuration')
  .action(async ({ path: configPath }: { path: string }) => {
    return init({ configPath })
  })

program.parse(process.argv)
