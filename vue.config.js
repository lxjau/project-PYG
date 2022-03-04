module.exports = {
    // 选项...
    productionSourceMap:false,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' }
                // 下面两个默认是true
                // ws: true,
                // changeOrigin: true
            },
        }
    }
}