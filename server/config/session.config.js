const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = app => {
    app.use(
        session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                // sameSite: 'none',
                httpOnly: true,
                maxAge: 6000000
            },
            store: MongoStore.create({
                mongoUrl: process.env.DB_REMOTE || 'mongodb://localhost/basicAuth'
            })
        })
    );
};