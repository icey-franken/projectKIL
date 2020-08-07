# README for instructables project features

Our project: replicate instructables.com website appearance and the functionality specified in feature list below.

## Group Members and Roles

UX Lead - Krisna

Model Lead - Lauren

Team Lead - Isaac

## Feature list specific to instructables project (**add development estimates to each**)

### Minimum Viable Product

#### 0. New Account Creation, Login, and Guest/Demo Login (~6 hours)

* as a... person interested in learning how to destructure/destroy things

* I want...to be able to join an online community centralize on this subject

* so that...I can have access to projects as well as create my own

* notes: we will want to use JWT to authenticate users. This will allow us to identify who created a project/comment and give update/destroy powers only to those who own a particular resource.
  * Ed says: **this is our focus for Monday** - goal is to finish projects and user auth on day one
  * **do projects feature before auth**
  * work on auth feature together - use S-M's walkthrough video

#### 1. Projects (~14 hours - ~6 h backend; ~8 h frontend)

* as a... person who enjoys destroying/destructuring things

* I want... a central resource where I can find instructions for destruction in a clear, ordered manner; to be able to create my own destructions so I can share with others; to be able to make changes to my destructions as I learn and improve; most importantly I would like the ability to destroy my destructions.

* so that... I may spend less time searching for what I need and more time destroying

* Ed says: do backend FIRST - use postman to test constantly. **"When you finish an algorithm - if you can test it, TEST IT!" - will save a lot of pain**
  * style views as your create them - NOT all at the end (nightmare)

* flow: make a branch for project feature; make AND test backend; make AND test frontend; merge branch to master; push updated master to gh.

#### 2. Commenting on projects (~5 hours)

* as a... person highly involved in the destructive community

* I want... to be able to give and get feedback from my community

* so that... we may all hone our skills and learn from one another

#### 3. Adding photos and videos to projects (~7 hours)

* as a... visually inclined human

* I want... to be able to show off my destructions and see the destructions of others using a SWEET drag and drop function (along with browsing my local files and embedding video links)
  * Ed says drag and drop and embedding videos are probably the hardest parts of this project - aA will set up an AWS buckets account for us to do video hosting from. Ed also has other resources for us. He says DON'T focus on this feature until AFTER Tuesday - for now use a div with a static placeholder image.

* so that... we may all may bask in the visual glory, and also so we are able to see what is going on, and how to do it.

#### 4. Searching projects by keyword (~6 hours)

* as a... person searching for ways to destruct

* I want... to be able to quickly search for what I need using keywords

* so that... I can spend less time searching and more time destroying

### Stretch Goals

#### 5. Bonus: Featured project channels (~8 hours)

* as an... avid destroyer

* I want... to keep my finger on the pulse of what's happening in the destructive community

* so that... I may not fall into irrelevance

#### 6. Bonus: Categories (~6 hours)

* as a... person with matured interests in rapid instantaneous deconstruction

* I want... to be able to easily view those things I know I am interested in, and not those that I am not

* so that... I can browse destructions that are in my fields of interest

#### 7. Bonus: Project History (~6 hours)

* as a... person known to make impulsive, questionable decisions

* I want... to be able to go back in time and correct my mistakes

* so that... I may provide only the highest quality of destructables knowledge to my fellow destructors

## Feature Packets Overview

Create a feature packet for each of the above features (features 1-4 at minimumin) in a new markdown document. Within that document include the following documentation (see documents 0-7 in feature-packets directory):

* models needed
  * use <https://drawsql.app/> for constructing model relationships
* endpoints needed
* templates needed
* wire frames or sketches

## Other features/requirements that apply to ALL projects

1. ~~new account creation, login, and guest/demo login~~ (included above in MVP)
2. a brief production readme file for github repo containing
   1. Brief explanation of what the app is and does
   2. Link to live site
   3. Discussion of technologies used
   4. Discussion of two features that show off the team's technical abilities
   5. Discussion of both challenges faced and the way the team solved them
   6. Code snippets to highlight the best code
3. hosting on Heroku (more instructions to come in W13)
4. four main features (MVP) in feature list specific to instrutables project must have:
   1. adequate styling
   2. smooth, bug-free navigation
   3. adequate and appropriate seed data to demonstrate the feature
