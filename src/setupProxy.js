const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    /* 请求路径,不要和页面url路径有重合 */
    app.use(createProxyMiddleware('/manage/**', {
        target: "http://127.0.0.1:5000",
        secure: false,
        changeOrigin: true,
    }))
}