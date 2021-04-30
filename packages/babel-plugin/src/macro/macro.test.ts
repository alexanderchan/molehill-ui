import plugin from 'babel-plugin-macros'
import pluginTester from 'babel-plugin-tester'
import path from 'path'

pluginTester({
  plugin,
  pluginName: '@molehill-ui/macro',
  babelOptions: {
    filename: __filename,
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-env',
    ],
  },
  filename: __filename,
  fixtures: path.join(__dirname, '__fixtures__'),
  snapshot: true,
})
