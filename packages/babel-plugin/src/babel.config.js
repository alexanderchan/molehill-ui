module.exports = function (api) {
  api.cache(false)
  const presets = [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ]

  return {
    presets,
  }
}
