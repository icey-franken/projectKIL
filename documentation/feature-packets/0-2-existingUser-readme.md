# README - Feature 0-2: Existing User Login (and Guest/Demo Login)

## Models Needed
* Projects
* Users
  * email (unique)
  * username (unique)
  * password
  * about you (separate table - seeded)
  * country (separate table - seeded)
  * third-party sign-in info (possibly N/A)
    * maybe include this info as a separate model that is linked to person through a foreign key?
* country (foreign key on user)
* about you (foreign key on user)


## Endpoints Needed

"/account/login/"
"/member/:userName/"

### login page: '/account/login/'

* login with facebook, google, twitter, autodesk
* log in with destructables username/password
* include a button for "login as guest"? Or just allow folks to browse website as a guest without any extra work - probably easiest/most user friendly way


### view your profile page: '/member/:username/'

### change account settings: '/member/:userName/settings/

## Templates Needed

* existing-user-sign-in.pug
* user-profile.pug

## Wire Frames or Sketches

## brainstorm

* Existing Users Can:
  * Create new projects (owned by user)
  * read projects (owned by anyone)
  * Update/edit projects (owned by user)
  * delete projects (owned by user)
  * like projects
  * create comments on projects

* WEEDS - add functionality for signed-in users to create comments and create, update, and delete projects
  * ALL users can read comments and "like" projects
