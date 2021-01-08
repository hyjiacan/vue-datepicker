const config = {
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false
}

if (process.argv.indexOf('--target') === -1 || process.argv.indexOf('lib') === -1) {
} else {
  config.configureWebpack = {
    externals: [
      '@popperjs/core'
    ],
    output: {
      library: 'DatePicker',
      libraryExport: 'default'
    }
  }
}

module.exports = config
