# README - Feature 0-1: New Account Creation

## Models Needed

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

"/account/register/"

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

## Templates Needed

* new-user-registration-form.pug
* layout.pug (nav-bar, header, footer, background image, a content div)

## Wire Frames or Sketches

## brainstorm

* non-users (not signed in) can only read comments and read projects (no create, update, delete functionality)
