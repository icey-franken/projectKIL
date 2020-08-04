# README - Feature 1: Projects (includes adding/uploading media)

## Models Needed

* see schema from drawsql: ![image](./modelImages/1-projects-drawSQL-export-2020-08-03_13_20.png "Basic Project Schema")
  * Projects
    * projectName
    * intro
    * supplies
    * destructions
    * userId
    * categoryId


## Endpoints Needed

### CREATE A PROJECT: '/create/'

* shows a page about creation
* has link to "/editInstructable/new"

### editing/updating a new project: '/editInstructable/new'

* asks for the name of the project and confirmation to create
* after confirming project creation you are redirected to "/editInstructable/edit/:projectId"

### editing/updating an existing project: '/editInstructable/edit/:projectId'

* this is main project creation page

### READ/VIEW A PROJECT
"/id/:projectName"

if there's a duplicated project with the same name, they'll add a dash and a number

### UPDATE A PROJECT -- should this be on a separate/same page for users' landing page?
"/editInstructable/edit/:projectId" shown after creating a new project and editing it

projectId is automatically generated with weird numbers and letters

### DELETE A PROJECT -- same question as above

----------------------------------------------------------------

### create new project: /editInstructable/new

### edit your project: /editInstructable/edit/:projectId

### edit project steps: /editInstructable/edit/:projectId/step/:stepId

### publish project: /editInstructable/publish/:projectId

### after deletion: /editInstructable/deleted

stepId 0 is the intro

* same abilities to upload/embed media as main project edit page, except specifc to step
* edit step page has three text boxes - one for step title, one for step contents, one for step supplies.

## Templates Needed

## Wire Frames or Sketches

## brainstorm

* adding media functionality is directly related to CREATING/UPDATING projects (included as separate feature for organizational purposes)
* adding comments functionality is directly related to READING projects route ('/id/:projectName')
