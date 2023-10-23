module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@database': './src/database',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@repositories': './src/repositories',
        '@services': './src/services',
        '@middlewares': './src/middlewares'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
