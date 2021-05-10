module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/admin', require('./admin.routes.js'))
    app.use('/supplier', require('./supplier.routes.js'))
}