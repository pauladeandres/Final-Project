module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/api/order', require('./order.routes.js'))
    app.use('/api/admin', require('./admin.routes.js'))
    app.use('/api/supplier', require('./supplier.routes.js'))
    app.use('/api/products', require('./supplier.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
}