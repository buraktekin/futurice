module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/dist/'
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