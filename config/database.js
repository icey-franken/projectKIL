const config = require("./index");

// move the below code to top of .sequelizerc if you're having issues locally. Remove when seeding production site.
require('dotenv').config()


const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect: "postgres",
        seederStorage: "sequelize"
    },
    production: {
        use_env_variable: 'DATABASE_URL',
    },
};
