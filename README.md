# Flow API ![](https://circleci.com/gh/srmds/FlowAPI/tree/master.svg?style=shield&circle-token=982140173ef2b98794c97ed9cfa17d90cddc17bf)
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

    DB_HOST=<PROJECTID>.mongolab.com
    DB_NAME=database_name
    DB_PORT=default_port
    DB_USER=username
    DB_PASSWORD=password
    NODE_ENV=development
    LOCAL_HOST=localhost
    LOCAL_DBPORT=default_port

### Import JSON sample data

Startup mongo by running:

	   mongo
	   
Create database a database, named flow:	   

	   use flow

Import sample data files can be found [here](https://raw.githubusercontent.com/srmds/FlowAPI/master/samples) and needs to be saved locally, then import dump by running:

		mongoimport -d flow -c artists --file collection.json
		
		where -d is databasename and -c the collection name
		

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
[/api/v1/artists](https://flow-api.herokuapp.com/api/v1/artists) | GET  | none | Retrieve all artists details

#### Album

Path | Method | Parameters   | Description
------------ | ------------- | ------------ | -----------
[/api/v1/albums](https://flow-api.herokuapp.com/api/v1/albums) | GET  | String | Retrieve albums details

#### Track

Path | Method | Parameters   | Description
------------ | ------------- | ------------ | -----------
[/api/v1/tracks](https://flow-api.herokuapp.com/api/v1/tracks) | GET  | String | Retrieve all tracks details

#### Genre

Path | Method | Parameters   | Description
------------ | ------------- | ------------ | -----------
[/api/v1/genres](https://flow-api.herokuapp.com/api/v1/genres) | GET  | String | Retrieve all genres details


## MochaJS tests

For every Endpoint there are tests, see test dir.

To run the Mocha tests, from `root` run:

      npm test
      
## Deploy backend to Heroku
Every change to the Master branch will trigger an automatic deployment
of the backend to Heroku, after an success build by Circle CI.

The backend is deployed to and accessed via:

[https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)
