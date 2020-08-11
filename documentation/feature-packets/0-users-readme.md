# README - Feature 0: User Log In and Sign Up

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
'/member/:userName/settings/'
"/account/register/"

### login page: '/account/login/'

* STRETCH GOAL - login with facebook, google, twitter, autodesk - dummy buttons on webpage for now
* log in with destructables username/password

### view your profile page: '/member/:username/'

### change account settings: '/member/:userName/settings/'

### signup page: '/account/register/'

* register with facebook, google, twitter, autodesk
* register for destructables account
  * email
  * username
  * password
  * about you (dropdown with multi-select of general "occupation"--this is a seeded file)
    * anarchist
    * part-time destroyer
    * destructive sympathizer
    * master of destruction
  * country

### logout page: '/account/logout/'

* remove user auth and redirect to homepage

## Templates Needed

* new-user-registration-form.pug
* layout.pug (nav-bar, header, footer, background image, a content div)
* existing-user-sign-in.pug
* user-profile.pug

## Wire Frames or Sketches

## brainstorm

* non-users (not signed in) can only read comments and read projects (no create, update, delete functionality)

* Existing Users Can:
  * Create new projects (owned by user)
  * read projects (owned by anyone)
  * Update/edit projects (owned by user)
  * delete projects (owned by user)
  * like projects
  * create comments on projects

* WEEDS - add functionality for signed-in users to create comments and create, update, and delete projects
  * ALL users can read comments and "like" projects
