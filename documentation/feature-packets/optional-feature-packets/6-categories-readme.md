# README - Feature 5: Bonus - Categories

## Models Needed

## Endpoints Needed

### category home page: '/:category'

#### Possible category values

* circuits
* workshop
* craft
* cooking
* living
* outside
* teachers

#### Each category page provides the following links

* featured projects (header links to '/:category/projects')
* classes (header links to '/classes')
  * displays classes relevant to that particular category
* contests (header links to '/contest')
  * displays contents relevant to that particular category
* community (header links to '/:category/community')
  * this is a forum for that category where users can make posts asking questions and other can answer.

### sort projects by category: '/:category/projects/:sort'

* same category options as category home page ('/:category')
  * circuits, workshop, craft, cooking, living, outside, teachers
* same sort options as '/projects/:sort'
  * featured (default values for no :sort specified), recent, popularity, views, winners

### sort projects by category and channel: '/:category/:channel/projects/:sort'

* same category options as category home page ('/:category')
  * circuits, workshop, craft, cooking, living, outside, teachers
* same sort options as '/projects/:sort'
  * featured (default values for no :sort specified), recent, popularity, views, winners

## Templates Needed

## Wire Frames or Sketches
