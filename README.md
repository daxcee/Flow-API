# Flow API ![](https://circleci.com/gh/stevenrmds/FlowAPI/tree/master.svg?style=shield&circle-token=982140173ef2b98794c97ed9cfa17d90cddc17bf)
Rest API

## Prerequisites

[NodeJS](https://nodejs.org)

[NPM](https://www.npmjs.com)

[MongoDB](https://www.mongodb.org)

Or via brew (OSX):

Install brew:

[http://brew.sh](http://brew.sh)

Install nodejs package:

    brew install node
    
## Install dependencies

We use NPM as the dependencies/package manager.

To install the needed modules for this NodeJS app, 
run the following command from to the `root`of the project:

    sudo npm install

Note that these dependencies are not checked in on the repo 
and thus are only available on the local machine.

## Build and Run

### Environment variables

Create a .env file in the root directory of your project. Add these environment-specific variables on new lines in the form of NAME=VALUE:

    DB_HOST=<PROJECTID>.mongolab.com or localhost for local development
    DB_NAME=database_name
    DB_PORT=default_port
    DB_USER=username
    DB_PASSWORD=password

Then, startup mongo by running:

	   mongodb
		
then, from the `root` of the project run:
 
     bin/www

## API

Open up a browser and go to the follow to check if server is properly running:

[http://localhost:3000](http://localhost:3000)

### API Endpoints
To be documented.

#### Artists
/api/artist

#### Tracks
/api/tracks

#### Videos
/api/videos

#### Events
/api/events

## MochaJS tests

For every Endpoint there are tests, see test dir.

To run the Mocha tests, from `root` run:

      npm test
      
## Deploy backend to Heroku
Every change to the Master branch will trigger an automatic deployment
of the backend to Heroku, after an success build by Circle CI.

The backend is deployed to and accessed via:

[https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)
