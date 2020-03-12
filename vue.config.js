const config = {
  publicPath: './',
  filenameHashing: false,
  css: {
    extract: false
  }
}

if (process.argv.indexOf('--target') === -1 || process.argv.indexOf('lib') === -1) {
  config.productionSourceMap = false
} else {
  config.productionSourceMap = true
  config.configureWebpack = {
    externals: [
      'vue-popperjs',
      'vue-popperjs/dist/vue-popper.min.css'
    ],
    output: {
      libraryExport: 'default'
    }
  }
}

module.exports = config
