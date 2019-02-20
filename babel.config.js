
module.exports = (api) => {
  const isTest = api.env('test')
  api.cache(true)

  const presetEnv = isTest ? ['@babel/preset-env', { targets: { node: 'current' } }] : '@babel/preset-env'

  const presets = [
    presetEnv,
    '@babel/preset-react'
  ]

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ]

  return {
    presets,
    plugins
  }
}
