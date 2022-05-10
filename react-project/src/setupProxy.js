const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {

  app.use(
    '/splcloud',
    createProxyMiddleware({
      target: 'https://c.y.qq.com',
      changeOrigin: true,
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.20.153.98:9999',
      changeOrigin: true,
    })
  )

}
