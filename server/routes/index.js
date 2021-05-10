module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/orders', require('./orders.routes.js'))
}