# CardLifeDB

A Card game api to handle search and deckbuilding for any card game.

### Core Components

- Angular JS (Super Hero Application Framework)
- Firebase   (Real-Time Database)
- Bootstrap  (CSS Framework)
- Font Awesome (Icon Framework)
- Node JS   (Server)
- NPM       (Backend Dependencies)
- Bower JS  (Frontend Dependencies)
- Grunt JS  (Task Runner)
- Travis CI (Build Server)  

## Setup

### Download git project

Run npm install to install all backend node package dependencies...

    $ npm install

Run bower install for all frontend bower package dependencies...

    $ bower install

Run grunt serve to confirm that everything is wired up...

    $ grunt serve

### Coding and Designing Using Livereload

When using grunt serve livereload will be running in the background

As you code and save changes locally, your browser will automagically be updated without needing to hit F5!

How refreshing! (no pun intended)

EXAMPLE

    Running "connect:livereload" (connect) task
    Started connect web server on http://localhost:4000

    Running "watch" task
    Waiting...

### Build & Deployment Process

As simple as build and deploy... literally

    $ grunt build

    $ grunt deploy


*grunt build*

- Clean out dist directory
- Wire bower component dependencies into index.html
- Minify, Concat, and Prefix application css and js dependencies
- Copy dependencies into dist directory


*grunt deploy*

- Run grunt build task
- Execute firebase deploy from command line
- Execute git add from command line
- Execute git commit -m "Latest Build and Firebase Deployment" from command line
- Execute git push
