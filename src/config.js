require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: 'gw.eureka.com',
  apiPort: process.env.APIPORT||80,
  app: {
    title: 'b2b-service-item-view',
    description: 'b2b-service-item-view',
    head: {
      titleTemplate: '%s',
      meta: [
        {name: 'description', content: 'All the modern best practices in passport.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Passport'},
        {property: 'og:image', content: ''},
        {property: 'og:locale', content: 'zh_cn'},
        {property: 'og:title', content: 'Passport'},
        {property: 'og:description', content: 'All the modern best practices in passport.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
