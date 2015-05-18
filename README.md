# Flow API ![](https://circleci.com/gh/stevenrmds/FlowAPI/tree/master.svg?style=shield&circle-token=982140173ef2b98794c97ed9cfa17d90cddc17bf)
Rest API

[https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)


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

### Import JSON sample data

Startup mongo by running:

	   mongo
	   
Create database a database, named flow:	   

	   use flow

Import sample data, source file can be found [here](https://raw.githubusercontent.com/stevenrmds/FlowAPI/master/sampleData.json) and needs to be saved locally, then import dump by running:

		mongoimport -d flow -c artists --file sampleData.json

### Start server
			
Finally, from `root` of the project run:
 
     bin/www 
     
     or 
     
     foreman start

Open up a new browser tab and go to the follow to check if server is properly running:

[http://localhost:3000](http://localhost:3000)

## API

### Endpoints

#### Artist

Path | Method | Parameters   | Description
------------ | ------------- | ------------ | -----------
[/api/artists](https://flow-api.herokuapp.com/api/artists) | GET  | none | Retrieve all artists details
[/api/artists/artistname](https://flow-api.herokuapp.com/api/artists/AAAA) | GET  | String | Retrieve details of a specific artist

#### Album

Path | Method | Parameters   | Description
------------ | ------------- | ------------ | -----------
[/api/artistname/albums](https://flow-api.herokuapp.com/api/AAAA/albums) | GET  | String |

#### Track

Path | Method | Parameters   | Description
------------ | ------------- | ------------ | -----------
[/api/artistname/tracks](https://flow-api.herokuapp.com/api/AAAA/tracks) | GET  | String |


*Not yet implemented

## MochaJS tests

For every Endpoint there are tests, see test dir.

To run the Mocha tests, from `root` run:

      npm test
      
## Deploy backend to Heroku
Every change to the Master branch will trigger an automatic deployment
of the backend to Heroku, after an success build by Circle CI.

The backend is deployed to and accessed via:

[https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)
