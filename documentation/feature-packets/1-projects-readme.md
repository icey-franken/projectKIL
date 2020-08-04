# README - Feature 1: Projects (includes adding/uploading media)

## Models Needed

* see schema from drawsql: ![image](./modelImages/1-projects-drawSQL-export-2020-08-03_13_20.png "Basic Project Schema")
  * Projects
    * projectId
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
* ~~projects model questions: I think there are two ways we can build the instructions for a project~~ (**ignore all of the following; see "project model thoughts"**)
   1. make each "destructable" (instruction) a separate instance of a model (with a listOrder on each instance)
      * I think each instance would need to be related to a destructionsList table.
      * would the destructionsList table have an array of destruction table ids that it would refer to? If so... why not have this list of destruction table ids directly on the project table and not have a destructionsList table?
        * WRONG - each individual destruction table would have a foreignKey of projectId on it, along with columns for listOrder (step number) and description (the step itself). By searching for desctructions where projectId = whatever we would grab only the destructions that apply to that project
      * The destructionsList table would sit between many destruction tables and a project table
      * The id of the destructionsList table would be a foreign key on the project table.
   1. have the instructions be a single array on ONE column in the project model

--------------------------------------------------------------;

Projects model thoughts

* The way we could set up our model relationships is

```javascript
//Project model association
Project.has(models.Introduction, { foreignKey: projectId });
Project.hasMany(models.Destruction, { foreignKey: projectId });
//Introduction model association
Introduction.belongsTo(models.Project, { foreignKey: projectId });
//Destruction model association
Destruction.belongsTo(models.Project, { foreignKey: projectId });
//note that the projectId foreign key lives on the destruction and introduction models. No foreign key for destruction or introduction exists on the project model
```

* then, to get the instructions for a particular project we would say

```javascript
//for example, project with id of 1
const projectId = 1
//this would grab our project name, who created it, and the category
const project = Project.findByPk(projectId);
//this would grab "step 0" along with supplies, if provided.
const intro = Introduction.findAll({
  where:
    { projectId: projectId }
})[0];
//this would grab step 1 through the final step in an array, with all steps in order
const steps = Destruction.findAll({
  where:
    { projectId: projectId },
  orderBy: 'listOrder'
});
```
