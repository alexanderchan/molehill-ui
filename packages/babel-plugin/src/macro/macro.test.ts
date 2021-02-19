import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from 'babel-plugin-macros'

pluginTester({
  plugin,
  pluginName: '@molehill-ui/macro',
  babelOptions: {
    filename: __filename,
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  },
  filename: __filename,
  fixtures: path.join(__dirname, '__fixtures__'),
  snapshot: true,
})
