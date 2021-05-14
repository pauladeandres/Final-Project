module.exports = app => {

    // Base URLS
    app.use('/api/order', require('./order.routes.js'))
    app.use('/api/admin', require('./admin.routes.js'))
    app.use('/api/product', require('./product.routes.js'))
    app.use('/api/supplier', require('./supplier.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/uploads', require('./uploads.routes'))
    app.use('/api/option', require('./option.routes'))
}