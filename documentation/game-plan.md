# GAME PLAN

Goals for Monday 8/10 from feature-list.md:

* start on the project feature backend (including testing)
* then move to project feature frontend (including testing)
* once we tackle that, work on user auth
* our main goals for monday are to 'finish' the project feature (at least a working skeleton) and finish user auth.
* **see feature-list.md for more details**

Goals for the day (from S-M's walkthrough video)

1. set up gitignore - DONE
2. set up .env
   1. DB_USERNAME=projectKIL_app
   2. DB_PASSWORD=kilthemall
   3. DB_DATABASE=projectKIL_development
   4. DB_HOST=localhost
   5. PORT=3000
   6. JWT_SECRET - FROM node repl: require('crypto').randomBytes(32).toString('hex');
   7. JWT_EXPIRES_IN=604800
   8. make sure to create your database using the same user/pass as above
3. set up .sequelizerc
   1. without sequelizerc the default config setup will be wrong

```js
//contents of .sequelizerc (located in route)
//database.js is js NOT json so that we can use string interpolation - allows us to use process.env so we can access variables in .env file
const path = require('path');
module.exports = {
  'config': path.resolve('config','database.js'),
  'models-path': path.resolve('db','models'),
  'seeders-path': path.resolve('db','seeders'),
  'migrations-path': path.resolve('db','migrations'),
};
```

4. config/index.js
   1. this file gets env variables from .env/defaults and allows us to export them as keys

```js
//contents of config/index.js
module.exports={
  environment: provess.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USERNAME || 'postgres', // we use ddefault of postgres so that if user/pass not specified it WON'T successfully connect and will instead give an authentication error, as it should
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
};
```

5. initialize npm and install packages
   1. npm init -y - create default package.json
      1. change main to app.js
   2. npm install necessary packages:
      1. express pug@2 sequelize pg per-env bcryptjs cookie-parser csurf jsonwebtoken express-bearer-token morgan (express-validator?)
   3. npm install -D:
      1. sequelize-cli dotenv-cli nodemon dotenv (express-sequelize-starter directory has dotenv as a dependency)
