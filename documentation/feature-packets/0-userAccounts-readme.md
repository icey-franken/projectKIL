# README - Feature 0: New Account Creation, Login, and Guest/Demo Login

## Models Needed

* Person
  * email
  * username
  * password
  * about you
  * country
  * third-party sign-in info (possibly N/A)
    * maybe include this info as a separate model that is linked to person through a foreign key?

## Endpoints Needed

### login page: /account/login/
* login with facebook, google, twitter, autodesk
* log in with destructables username/password
* include a button for "login as guest"? Or just allow folks to browse website as a guest without any extra work - probably easiest/most user friendly way

### signup page: /account/register/
* register with facebook, google, twitter, autodesk
* register for destructables account
  * email
  * username
  * password
  * about you (dropdown with multi-select of general "occupation")
    * anarchist
    * part-time destroyer
    * destructive sympathizer
    * master of destruction
  * country

### view your profile page: /member/:username/

## Templates Needed

* existing-user-sign-in.pug
* new-user-registration.pug
* user-profile.pug

## Wire Frames or Sketches
