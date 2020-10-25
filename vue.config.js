module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/futurice/'
  : '/'
  /*
  called in main.js currently not required!
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/scaffolds.scss";`
      }
    }
  },
   */
}