module.exports = {
  configureWebpack: {
    externals: {
      moment: 'moment'
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}
