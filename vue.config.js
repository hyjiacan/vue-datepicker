const config = {
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: true,
}

if (process.argv.indexOf('--target') === -1 || process.argv.indexOf('lib') === -1) {
  console.log('Build non-library')
} else {
  console.log('Build library')
  config.configureWebpack = {
    externals: [
      '@popperjs/core',
      'lodash.clonedeep'
    ],
    output: {
      library: 'DatePicker',
      libraryExport: 'default'
    }
  }
}

module.exports = config
