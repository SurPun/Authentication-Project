# Authentication-Project

## By: Abdullah, Alex, Paz & Suraj

### A place to post your SGC: <br>
<strong>Stop</strong> - Doing Things <br>
<strong>Go</strong> - Start Doin Things <br>
<strong>Continue</strong> - Doing Things

## Roles

Abdullah: Scrum Facilitator<br>
Alex: UX/ UI<br>
Paz: Adops<br>
Suraj: QA

## Setup

Make sure you have Git and Node (v18) installed.

Clone this repo and cd into the directory

Run `npm install` to install all the dependencies

Run `npm run seed (npm run seedWin for Windows)` to seed the local database.

Run `npm run dev (npm run devWin for Windows)` to start the server.

This uses the nodemon library to auto-restart the server when you save changes.

## Test

`npm run test:1`

To test in Windows run:

`npm run testWin`

## User stories

Core:

- As a user, I want to: submit information to your site for anyone to see
- As a user, I want to: come back to your site later and see what I posted is still there
- As a user, I want to: be the only person allowed to delete my stuff

## Acceptance Criteria

- [x] Forms for users to sign up and log in

- [x] A form for users to submit data only accessible to logged in users

- [x] A page showing all the data

- [x] A way for logged in users to delete their own data

- [x] Semantic form elements with correctly associated labels

- [x] A SQLite database

- [x] Hidden environment variables (i.e. not on GitHub)

## Stretch criteria:

- [ ] Tests for all routes

- [x] A user page that shows everything posted by a single user

- [ ] GitHub Actions CI setup to run your tests when you push

## Stretch

- [ ] Edit actions
- [x] Create personal and group boards
