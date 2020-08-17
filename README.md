# projectKIL

## Brief explanation of what the app is and does

Destructables is a place where destroyers from all walks of life can come together and share their hard-earned destructive knowledge.

Users can view projects created by others, create their own projects, and interact with the destructive community via discussion boards on each project. 

Each project contains a number of steps and images to aid in your destructions, along with a list of supplies you may require.

## Link to live site

[Welcome to Destructables.](https://destructables-app.herokuapp.com/)

## Discussion of technologies used

Application built using node.js.

Application uses the express web framework to handle requests and routing.

Database is built in Postgres and is interacted with using Sequelize ORM.

Front-end user views are created using a combination of PUG HTML templates and vanilla JS for dynamic rendering of views (AJAX).

Webpage styling is done with bootstrap (v4.1.1) and custom CSS.

AWS is used for image hosting.

Heroku is used to host our full application. 

## Discussion of two features that show off the team's technical abilities

### Feature 1:

### Feature 2:

## Discussion of both challenges faced and the way the team solved them

A bug we encountered was an issue with our data validations. We had a not null constraint set that supposed to prevent null from being sent to our database. This was supposed to log an error on the browser. It was working, but then after some changes it stopped working and we were unable to get our page to render beyond the basic layout. After many hours of digging we found that a dummy value we had set to null in order to test our validations was actually set to 'null' (a string). This was buried in our vanilla JS used to render the page. Lesson learned - null as a string is different from null-null. We knew this before hand, but after this experience it is seared into our brains.

The biggest challenge was the time constraints. A week is not a long time. For me the most difficult part related to time constraints was picking a single task to carry out. It the process of trying to do a particular thing, it was almost guaranteed that I would get sidetracked by things I encountered along the way that needed to be added, polished, or straight up not working. I assume this is normal. By the time I crawled out of whatever rabbit hole I fell into, hours had passed and the task I set out intending to carry out was many times nearly untouched. That's not to say that important work wasn't done - but it wasn't the work I had intended to. I think in the future it will be useful to do a better job of developing a task list (using something like a kanban) and be very descript with the objectives. Then, those objectives should be tackled in an intentional manner, one at a time, to the best of my abilities. This should help to decrease the amount of time I spend in rabbit holes. This will also help with progress tracking. Many times the rabbit holes were so deep that by the time I crawled out I wasn't exactly sure of everything that I had done. This made communicating to team members what I had done difficult, and likely made their jobs more difficult.

## Code snippets to highlight the best code
