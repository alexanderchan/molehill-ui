import { Command } from 'commander'
import { prompt } from 'enquirer'
import fs from 'fs'
import path from 'path'

const program = new Command()

program
  .version('1.0.0')
  .command('init', 'Initialize MoleHill UI', { isDefault: true })
  .option('-p --path <path>', 'path', process.cwd())
  .description('initializes configuration')
  .action(({ path: configPath }: { path: string }) => {
    const configFileName = 'molehill.config.js'
    const configFilePath = path.resolve(configPath, configFileName)

    if (fs.existsSync(configFilePath)) {
      prompt({
        type: 'confirm',
        name: 'question',
        message: `${configFileName} already exists are you sure you want to overwrite it?`,
      }).then((shouldCreateFile) => {
        if (shouldCreateFile) {
          console.info('Answer:', shouldCreateFile)
        } else {
          console.info(`${configFileName} not created`)
        }
      })
    } else {
      console.info(`${configFileName} created`)
    }
  })
  .parse(process.argv)
