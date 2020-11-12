# projectKIL - [Welcome to Destructables](https://destructables-app.herokuapp.com/)

Destructables is a place where destroyers from all walks of life can come together and share their hard-earned destructive knowledge.

Users can view projects created by others, create their own projects, and interact with the destructive community via discussion boards on each project. 

Each project contains a number of steps and images to aid in your destructions, along with a list of supplies you may require.

## Discussion of technologies used

Application built using node.js.

Application uses the express web framework to handle requests and routing.

Database is built in Postgres and is interacted with using Sequelize ORM.

Front-end user views are created using a combination of PUG HTML templates and vanilla JS for dynamic rendering of views (AJAX).

Webpage styling is done with bootstrap (v4.1.1) and custom CSS.

AWS is used for image hosting.

Heroku is used to host our full application. 

## Discussion of both challenges faced and the way the team solved them

A bug we encountered was an issue with our data validations. We had a not null constraint set that supposed to prevent null from being sent to our database. This was supposed to log an error on the browser. It was working, but then after some changes it stopped working and we were unable to get our page to render beyond the basic layout. After many hours of digging we found that a dummy value we had set to null in order to test our validations was actually set to 'null' (a string). This was buried in our vanilla JS used to render the page. Lesson learned - null as a string is different from null-null. We knew this before hand, but after this experience it is seared into our brains.

The biggest challenge was the time constraints. A week is not a long time. For me the most difficult part related to time constraints was picking a single task to carry out. In the process of trying to do a particular thing, it was almost guaranteed that I would get sidetracked by things I encountered along the way that needed to be added, polished, or straight up fixed because something I did caused them to work improperly. I assume the rabbit hole phenomenon is normal. By the time I crawled out of whatever rabbit hole I fell into, hours had passed and the task I set out intending to accomplish was often times nearly untouched. That's not to say that important work wasn't done, but it wasn't the work I had intended to. I think in the future it will be useful to do a better job of developing a task list (using something like a kanban) and be very descript with the objectives. Then, those objectives should be tackled in an intentional manner, one at a time, to the best of my abilities. This should help to decrease the amount of time I spend in rabbit holes. This will also help with progress tracking. Many times the rabbit holes were so deep that by the time I crawled out I wasn't exactly sure of everything that I had done. This made communicating to team members what I had done difficult, and likely made their jobs more difficult. Time spent planning is NOT time wasted - I will carry this lesson with me.

## Discussion of two features that show off the team's technical abilities

### Feature 1:

### Feature 2:

## Code snippets to highlight the best code

### sequelize-cli configuration
Sequelize folders can be organized by setting up the .sequelizesrc file. The 4 main folders we set up are the
1. configuration of the database
2. database models
3. database seeders
4. database migrations

The entire .sequelizerc file looks like this:
```
require('dotenv').config()
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};

```

The ```require(dotenv).config``` at the top is needed to grab environment variables.

1. For the configuration of the database, it looks in the "config" folder and find "database.js"
2. For the creating models, it looks in the "db" folder and saves them in the "models" folder.
3. For the creating seeders, it looks in the "db" folder and saves them in the "seeders" folder.
4. For the creating migrations, it looks in the "db" folder and saves them in the "migrations" folder.

* The database.js file exports the variables needed to authenticate the database which were fetched from the "index.js" file They export must exported with keys either "development" and/or "production".
```
//database.js//

const config = require("./index");

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
```
The ```const config = require("./index")``` imports a file called "index.js" that grabs all of the secret environment variables in the env file.
```
// Index.js //

module.exports = {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    db: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    iamConfig: {
        iamAccessId: process.env.IAM_ACCESS_ID,
        iamSecret: process.env.IAM_SECRET
    },
    awsConfig: {
        awsAccessId: process.env.AWS_ACCESS_ID,
        awsSecret: process.env.AWS_SECRET,
        awsRegion: process.env.AWS_REGION,
        awsBucket: process.env.AWS_BUCKET
    }
};
