
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
dotenv.config();

const sessionConfig = session({
    store: new MongoStore({
        mongoUrl: process.env.MONGODB,
        ttl: 600,
        autoRemove: 'native',
        dbName: process.env.DB

    }),
    secret: 'proyecto18',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
})

module.exports = { 
    sessionConfig
};