heroku login
heroku git:remote -a destructable
git push heroku master
heroku run npx sequelize-cli -a destructable db:seed:undo:all
heroku run npx sequelize-cli -a destructable db:migrate:undo:all
heroku run npx sequelize-cli -a destructable db:migrate
heroku run npx sequelize-cli -a destructable db:seed:all
