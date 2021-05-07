import chalk from 'chalk'
import { prompt } from 'enquirer'
import fs from 'fs'
import path from 'path'

// there is a different relative path when run with preconstruct dev
const STUB_DIRECTORY = fs.existsSync(`${__dirname}/../stubs`)
  ? `${__dirname}/../stubs`
  : `${__dirname}/../../stubs`

async function createConfig({
  configPath,
  stubFilename,
}: {
  configPath: string
  stubFilename: string
}) {
  const configFileName = stubFilename.replace('.stub', '')
  const configFilePath = path.resolve(configPath, configFileName)

  if (fs.existsSync(configFilePath)) {
    await prompt<{ question: boolean }>({
      type: 'confirm',
      name: 'question',
      message: `${configFileName} already exists are you sure you want to overwrite it?`,
    }).then((shouldCreateFile) => {
      if (shouldCreateFile.question) {
        fs.copyFileSync(
          path.resolve(`${STUB_DIRECTORY}/${stubFilename}`),
          configFilePath
        )
      } else {
        console.info(`${configFileName} not created: \n`)
      }
    })
  } else {
    fs.copyFileSync(
      path.resolve(`${STUB_DIRECTORY}/${stubFilename}`),
      configFilePath
    )
    console.info(`${configFileName} created`)
  }
}

function packageMangerInstallCommand() {
  const isYarn = fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'))
  return isYarn ? `yarn add` : `npm install`
}

export function instructions() {
  const examples = [
    {
      // babel filenames can be a variety of formats
      instructions:
        'Please add the plugin to your .babelrc before your css in js plugin:',
      exampleFile: '.babelrc.stub.json',
    },
    {
      instructions: 'Add this import to your stylesheet',
      exampleFile: 'styles.stub.css',
    },
  ]
  for (const example of examples) {
    console.info(`\n${example.instructions}\n`)

    console.info(
      example.exampleFile &&
        chalk.blue(
          fs.readFileSync(`${STUB_DIRECTORY}/${example.exampleFile}`).toString()
        )
    )
  }

  console.info('Add these packages using your favorite package manager:\n')
  console.info(
    chalk.blue(
      `${packageMangerInstallCommand()} @molehill-ui/theme @molehill-ui/babel-plugin`
    )
  )
}

export async function init({ configPath }) {
  const stubs = ['molehill.config.stub.js', 'postcss.config.stub.js']

  for (const stubFilename of stubs) {
    await createConfig({ configPath, stubFilename })
  }

  instructions()
}
