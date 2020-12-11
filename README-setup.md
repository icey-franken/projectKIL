See database.js for note about possible change needed to sequelizerc. the 'require('dotenv').config()' needs to be removed from sequelizerc when pushing to heroku.

Then run the following:

heroku login
heroku git:remote -a destructable
git push heroku master
heroku run npx sequelize-cli -a destructable db:seed:undo:all
heroku run npx sequelize-cli -a destructable db:migrate:undo:all
heroku run npx sequelize-cli -a destructable db:migrate
heroku run npx sequelize-cli -a destructable db:seed:all
