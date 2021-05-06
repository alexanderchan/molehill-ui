module.exports = function (api) {
  api.cache(false)

  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ]
  const plugins = []

  return {
    presets,
    plugins,
  }
}
